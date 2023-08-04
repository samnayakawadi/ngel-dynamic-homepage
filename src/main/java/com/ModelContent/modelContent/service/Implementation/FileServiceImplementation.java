package com.ModelContent.modelContent.service.Implementation;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.ModelContent.modelContent.config.MD5Hashing;
import com.ModelContent.modelContent.exceptionHandler.GlobalCustomException;
import com.ModelContent.modelContent.response.GlobalReponse;
import com.ModelContent.modelContent.response.file.FileData;
import com.ModelContent.modelContent.response.file.FileResponse;
import com.ModelContent.modelContent.service.main.FileService;

import org.apache.commons.io.FilenameUtils;
import org.apache.tika.Tika;

@Component
public class FileServiceImplementation implements FileService {

	@Autowired
	private Environment env;

	private WebClient webClient;

	public FileServiceImplementation(WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder
				.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10485760)) // 10MB buffer size
				.baseUrl("http://meghs3.hyderabad.cdac.in:5000")
				.build();
	}

	public byte[] getSanitizedImage(MultipartFile image) {
		MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
		bodyBuilder.part("image", image.getResource())
				.filename(image.getOriginalFilename())
				.contentType(MediaType.parseMediaType(image.getContentType()));

		MultiValueMap<String, HttpEntity<?>> parts = bodyBuilder.build();

		return webClient.post()
				.uri("/imrecons")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
				.body(BodyInserters.fromMultipartData(parts))
				.retrieve()
				.bodyToMono(byte[].class)
				.block(); // Block and wait for the Mono to complete
	}

	public void validateFileNameAndExtension(MultipartFile file, String fileHash) {
		String filename = FilenameUtils.getName(file.getOriginalFilename());
		String filehash = MD5Hashing.generateMD5(Long.toString(file.getSize()));

		if (filehash.equals(fileHash)) {

			if (filename.split("\\.").length != 2 || FilenameUtils.getExtension(filename) == null) {
				throw new GlobalCustomException(new GlobalReponse(409, "Error Validating File Extension"),
						HttpStatus.CONFLICT);
			}
		} else {
			throw new GlobalCustomException(new GlobalReponse(409, "File Hash Incorrect"),
					HttpStatus.CONFLICT);
		}
	}

	@Override
	public FileResponse addNewFile(MultipartFile multipartFile, String fileHash) throws IOException {

		validateFileNameAndExtension(multipartFile, fileHash);

		Tika tika = new Tika();
		String mediaType = tika.detect(multipartFile.getBytes());

		if (mediaType.equalsIgnoreCase("image/jpeg") || mediaType.equalsIgnoreCase("image/jpg")
				|| mediaType.equalsIgnoreCase("image/png")) {

			String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());

			// InputStream inputStream = multipartFile.getInputStream(); // gets the data
			byte[] fileData = getSanitizedImage(multipartFile);

			UUID uuid = UUID.randomUUID();
			String uniqueFileId = uuid.toString();

			// inputStream.read(fileData); // stores the data in fileData

			FileOutputStream fileOutputStream;
			try {

				// Writing the data into actual file
				fileOutputStream = new FileOutputStream(
						env.getProperty("fileUploadURL") + uniqueFileId + "." + fileExtension);
				fileOutputStream.write(fileData);
				fileOutputStream.close();
			} catch (Exception e) {
				throw new GlobalCustomException(new GlobalReponse(500, "Saving file in folder failed"),
						org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
			}

			FileData fileResponse = new FileData();

			fileResponse.setFileId(uniqueFileId);
			fileResponse.setFileName(multipartFile.getOriginalFilename());
			fileResponse.setFileType(multipartFile.getContentType());
			fileResponse.setFileSize(multipartFile.getSize());

			return new FileResponse(200, "File Uploaded Successfully", fileResponse);
		} else {
			throw new GlobalCustomException(new GlobalReponse(406, "Invalid File"),
					org.springframework.http.HttpStatus.NOT_ACCEPTABLE);
		}

	}
}

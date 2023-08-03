package com.ModelContent.modelContent.service.Implementation;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

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

	public byte[] getSanitizedImage(MultipartFile image) throws IOException {
		try {
			return WebClient.builder()
					.baseUrl("http://meghs3.hyderabad.cdac.in:5000")
					.build().post()
					.uri("/imrecons")
					.contentType(MediaType.MULTIPART_FORM_DATA)
					.body(BodyInserters.fromMultipartData("image",new ByteArrayResource(image.getBytes()) {
								@Override
								public String getFilename() {
									return image.getOriginalFilename();
								}
							}))
					.retrieve()
					.bodyToMono(byte[].class)
					.block();
		} catch (Exception e) {
			System.out.println("Sanitization Error : " + e.getMessage());
			throw new GlobalCustomException(new GlobalReponse(500, "Error during Sanitizing Image"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public FileResponse addNewFile(MultipartFile multipartFile) throws IOException {

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

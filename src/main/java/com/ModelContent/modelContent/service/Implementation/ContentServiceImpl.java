package com.ModelContent.modelContent.service.Implementation;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.File;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.ModelContent.modelContent.document.ContentModel.linkTypeContent.LinkTypeContent;
import com.ModelContent.modelContent.document.ContentModel.textTypeContent.TextTypeContent;
import com.ModelContent.modelContent.dto.ContentModelDTO;
import com.ModelContent.modelContent.dto.data.TextTypeContentDTO;
import com.ModelContent.modelContent.dto.data.LinkTypeDto.LinkTypeContentDTO;
import com.ModelContent.modelContent.exceptionHandler.GlobalCustomException;
import com.ModelContent.modelContent.exceptionHandler.GlobalValidationException;
import com.ModelContent.modelContent.model.ContentModel;
import com.ModelContent.modelContent.response.GlobalReponse;
import com.ModelContent.modelContent.response.GlobalValidationResponse;
import com.ModelContent.modelContent.service.main.ContentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ContentServiceImpl implements ContentService {

	@Autowired
	private Environment env;

	@Override
	public ContentModel getContentModel(String language) {
		return loadContentFromFile(language);
	}

	@Override
	public GlobalReponse updateContentModel(ContentModelDTO contentModelDTO, String language)
			throws IllegalArgumentException, IllegalAccessException {
		// ContentModel contentModel = convertToEntity(contentModelDTO);

		ContentModel existingContent = loadContentFromFile(language);

		if (existingContent == null) {
			return new GlobalReponse(400, "JSON Parse Error");
		}

		// if (!checkRegexWithValue(existingContent.getCdac_address().getRegex(),
		// contentModelDTO.getCdac_address().getValue())) {
		// // throw new Glo("cdac_address does not")
		// }
		// Total 56 Keys are request to set

		checkForValidationForContentModelDTO(existingContent, contentModelDTO);

		existingContent.getCdac_address().setValue(contentModelDTO.getCdac_address().getValue());
		existingContent.getHave_questions().setValue(contentModelDTO.getHave_questions().getValue());
		existingContent.getLog_in().setValue(contentModelDTO.getLog_in().getValue());
		existingContent.getRegister().setValue(contentModelDTO.getRegister().getValue());
		existingContent.getMegh_Logo().setLink(contentModelDTO.getMegh_Logo().getLink());
		existingContent.getCall_us_now().setValue(contentModelDTO.getCall_us_now().getValue());
		existingContent.getCall_us_phone().setLink(contentModelDTO.getCall_us_phone().getLink());
		existingContent.getEnquiry_us().setValue(contentModelDTO.getEnquiry_us().getValue());
		existingContent.getEnquiry_us_id().setLink(contentModelDTO.getEnquiry_us_id().getLink());
		existingContent.getHome().setValue(contentModelDTO.getHome().getValue());
		existingContent.getAbout_us().setValue(contentModelDTO.getAbout_us().getValue());
		existingContent.getCourses().setValue(contentModelDTO.getCourses().getValue());
		existingContent.getCarousel_img1().setLink(contentModelDTO.getCarousel_img1().getLink());
		existingContent.getCarousel_img2().setLink(contentModelDTO.getCarousel_img2().getLink());
		existingContent.getCarousel_img3().setLink(contentModelDTO.getCarousel_img3().getLink());
		existingContent.getCarousel_img4().setLink(contentModelDTO.getCarousel_img4().getLink());
		existingContent.getCarousel_img5().setLink(contentModelDTO.getCarousel_img5().getLink());
		existingContent.getPopular_courses().setValue(contentModelDTO.getPopular_courses().getValue());
		existingContent.getPopular_courses_desc().setValue(contentModelDTO.getPopular_courses_desc().getValue());
		existingContent.getModern_library().setValue(contentModelDTO.getModern_library().getValue());
		existingContent.getModern_library_desc().setValue(contentModelDTO.getModern_library_desc().getValue());
		existingContent.getQualified_teacher().setValue(contentModelDTO.getQualified_teacher().getValue());
		existingContent.getQualified_teacher_desc().setValue(contentModelDTO.getQualified_teacher_desc().getValue());
		existingContent.gethOPPA_image().setLink(contentModelDTO.gethOPPA_image().getLink());
		existingContent.getTitle().setValue(contentModelDTO.getTitle().getValue());
		existingContent.getAbout_desc1().setValue(contentModelDTO.getAbout_desc1().getValue());
		existingContent.getAbout_desc2().setValue(contentModelDTO.getAbout_desc2().getValue());
		existingContent.getHappy_students().setValue(contentModelDTO.getHappy_students().getValue());
		existingContent.getTeachers().setValue(contentModelDTO.getTeachers().getValue());
		existingContent.getCoursess().setValue(contentModelDTO.getCoursess().getValue());
		existingContent.getRead_more().setValue(contentModelDTO.getRead_more().getValue());
		existingContent.getInfo_title().setValue(contentModelDTO.getInfo_title().getValue());
		existingContent.getView_all_courses().setValue(contentModelDTO.getView_all_courses().getValue());
		existingContent.getUpcoming().setValue(contentModelDTO.getUpcoming().getValue());
		existingContent.getEvents().setValue(contentModelDTO.getEvents().getValue());
		existingContent.getFrequently_ask().setValue(contentModelDTO.getFrequently_ask().getValue());
		existingContent.getQuestion().setValue(contentModelDTO.getQuestion().getValue());
		existingContent.getFaq_titile_1().setValue(contentModelDTO.getFaq_titile_1().getValue());
		existingContent.getFaq_desc_1().setValue(contentModelDTO.getFaq_desc_1().getValue());
		existingContent.getFaq_titile_2().setValue(contentModelDTO.getFaq_titile_2().getValue());
		existingContent.getFaq_desc_2().setValue(contentModelDTO.getFaq_desc_2().getValue());
		existingContent.getFaq_titile_3().setValue(contentModelDTO.getFaq_titile_3().getValue());
		existingContent.getFaq_desc_3().setValue(contentModelDTO.getFaq_desc_3().getValue());
		existingContent.getCard_title().setValue(contentModelDTO.getCard_title().getValue());
		existingContent.getCard_desc().setValue(contentModelDTO.getCard_desc().getValue());
		existingContent.getCard_btn().setValue(contentModelDTO.getCard_btn().getValue());
		existingContent.getcA().setValue(contentModelDTO.getcA().getValue());
		existingContent.getCdac_full_address().setValue(contentModelDTO.getCdac_full_address().getValue());
		existingContent.getCopyright().setValue(contentModelDTO.getCopyright().getValue());
		existingContent.getDesign_develop().setValue(contentModelDTO.getDesign_develop().getValue());
		existingContent.getFooterPoweredBy().setLink(contentModelDTO.getFooterPoweredBy().getLink());
		existingContent.getFooterMeghS().setLink(contentModelDTO.getFooterMeghS().getLink());
		existingContent.getFooterHelp().setLink(contentModelDTO.getFooterHelp().getLink());
		existingContent.getPowerby1().setValue(contentModelDTO.getPowerby1().getValue());
		existingContent.getMegh1().setValue(contentModelDTO.getMegh1().getValue());

		boolean success = saveContentToFile(existingContent, language);
		if (success) {
			return new GlobalReponse(200, "Data updated successfully");
		} else {
			return new GlobalReponse(500, "Failed to update data");
		}

		// return new GlobalReponse(200, "Data updated successfully SSS");

	}

	public boolean checkRegexWithValue(String regex, String value) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}

	private ContentModel loadContentFromFile(String language) {

		String filePath = getFilePath(language);

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.readValue(new File(filePath), ContentModel.class);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}

	}

	public boolean saveContentToFile(ContentModel content, String language) {
		String filePath = getFilePath(language);
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new File(filePath), content);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	private String getFilePath(String language) {
		String fileName = language.toLowerCase() + ".json";
		// return "C:\\Users\\q\\Desktop\\Dynamic NGEL Backend\\Dynamic NGEL
		// Backend\\src\\main\\java\\com\\ModelContent\\modelContent\\json\\"
		// + fileName;
		// return "C:\\Users\\q\\Desktop\\json file NGEL\\" + fileName;
		return env.getProperty("content.upload.url") + fileName;
	}

	public void checkForValidationForContentModelDTO(ContentModel existingContent, ContentModelDTO contentModelDTO)
			throws IllegalArgumentException, IllegalAccessException {

		Field[] existingContentFields = existingContent.getClass().getDeclaredFields();
		Field[] contentModelFields = contentModelDTO.getClass().getDeclaredFields();

		Map<String, String> errors = new HashMap<>();

		try {
			int i = 0;
			for (Field field : existingContentFields) {

				if (field.getType().equals(TextTypeContent.class)) {
					TextTypeContent existingContentTextTypeModel = (TextTypeContent) field.get(existingContent);
					TextTypeContentDTO contentModelDTOTextTypeModel = (TextTypeContentDTO) contentModelFields[i]
							.get(contentModelDTO);

					if (existingContentTextTypeModel.getRegex() != null
							&& !checkRegexWithValue(existingContentTextTypeModel.getRegex(),
									contentModelDTOTextTypeModel.getValue())) {
						errors.put(field.getName(), existingContentTextTypeModel.getErrorMessage());
					}

				} else if (field.getType().equals(LinkTypeContent.class)) {
					LinkTypeContent existingLinkTypeContent = (LinkTypeContent) field.get(existingContent);
					LinkTypeContentDTO contentModelDTOLinkTypeModel = (LinkTypeContentDTO) contentModelFields[i]
							.get(contentModelDTO);

					if (existingLinkTypeContent.getTitle().getRegex() != null
							&& !checkRegexWithValue(existingLinkTypeContent.getTitle().getRegex(),
									contentModelDTOLinkTypeModel.getTitle().getValue())) {
						errors.put(field.getName() + ".title", existingLinkTypeContent.getTitle().getErrorMessage());
					}

					if (existingLinkTypeContent.getLink().getRegex() != null
							&& !checkRegexWithValue(existingLinkTypeContent.getLink().getRegex(),
									contentModelDTOLinkTypeModel.getLink().getValue())) {
						errors.put(field.getName() + ".link", existingLinkTypeContent.getLink().getErrorMessage());
					}
				}

				i++;
			}
		} catch (Exception e) {
			throw new GlobalCustomException(new GlobalReponse(500, "Error Parsing The JSON"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (errors.size() != 0) {
			throw new GlobalValidationException(new GlobalValidationResponse(406, errors),
					HttpStatus.NOT_ACCEPTABLE);
		}
	}
}

// Important Code for Custom Dynamic Validations for File
// else if (field.getType().equals(FileTypeContent.class)) {
// FileTypeContent existingContentFileTypeModel = (FileTypeContent)
// field.get(existingContent);
// FileTypeContentDTO contentModelDTOFileTypeModel = (FileTypeContentDTO)
// contentModelFields[i]
// .get(contentModelDTO);

// if (existingContentFileTypeModel.getRegex() != null
// && !checkRegexWithValue(existingContentFileTypeModel.getRegex(),
// contentModelDTOFileTypeModel.getLink())) {
// errors.put(field.getName(), existingContentFileTypeModel.getErrorMessage());
// }

// }
package com.ModelContent.modelContent.service.Implementation;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.File;

import org.springframework.stereotype.Component;

import com.ModelContent.modelContent.dto.ContentModelDTO;
import com.ModelContent.modelContent.model.ContentModel;
import com.ModelContent.modelContent.response.GlobalReponse;
import com.ModelContent.modelContent.service.main.ContentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ContentServiceImpl implements ContentService {

	@Override
	public ContentModel getContentModel(String language) {
		return loadContentFromFile(language);
	}

	@Override
	public GlobalReponse updateContentModel(ContentModelDTO contentModelDTO, String language) {
		// ContentModel contentModel = convertToEntity(contentModelDTO);

		ContentModel existingContent = loadContentFromFile(language);

		if (existingContent == null) {
			return new GlobalReponse(400, "JSON Parse Error");
		}

		// if (!checkRegexWithValue(existingContent.getCdac_address().getRegex(),
		// 		contentModelDTO.getCdac_address().getValue())) {
		// 			// throw new Glo("cdac_address does not")
		// }

		// Total 56 Keys are request to set
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

	public Boolean checkRegexWithValue(String regex, String value) {
		// String regexPattern =
		// "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b";
		Pattern pattern = Pattern.compile(regex);

		// String inputString = "john.doe@example.com";
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
		return "C:\\Users\\q\\Desktop\\Dynamic NGEL Backend\\Dynamic NGEL Backend\\src\\main\\java\\com\\ModelContent\\modelContent\\json\\"
				+ fileName;
		// return "C:\\Users\\samnayakawadi\\Downloads\\" + fileName;
	}
}

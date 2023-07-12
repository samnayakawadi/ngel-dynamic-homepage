package com.ModelContent.modelContent.service.Implementation;

import java.io.IOException;
import java.io.File;

import org.springframework.stereotype.Component;

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
	public GlobalReponse updateContentModel(ContentModel contentModel, String language) {
		ContentModel existingContent = loadContentFromFile(language);

		if (existingContent == null) {
			return new GlobalReponse(400, "JSON Parse Error");
		}

		// Total 56 Keys are request to set

		existingContent.getCdac_address().setValue(contentModel.getCdac_address().getValue());
		existingContent.getHave_questions().setValue(contentModel.getHave_questions().getValue());
		existingContent.getLog_in().setValue(contentModel.getLog_in().getValue());
		existingContent.getRegister().setValue(contentModel.getRegister().getValue());
		existingContent.getMegh_Logo().setLink(contentModel.getMegh_Logo().getLink());
		existingContent.getCall_us_now().setValue(contentModel.getCall_us_now().getValue());
		existingContent.getCall_us_phone().setLink(contentModel.getCall_us_phone().getLink());
		existingContent.getEnquiry_us().setValue(contentModel.getEnquiry_us().getValue());
		existingContent.getEnquiry_us_id().setLink(contentModel.getEnquiry_us_id().getLink());
		existingContent.getHome().setValue(contentModel.getHome().getValue());
		existingContent.getAbout_us().setValue(contentModel.getAbout_us().getValue());
		existingContent.getCourses().setValue(contentModel.getCourses().getValue());
		existingContent.getCarousel_img1().setLink(contentModel.getCarousel_img1().getLink());
		existingContent.getCarousel_img2().setLink(contentModel.getCarousel_img2().getLink());
		existingContent.getCarousel_img3().setLink(contentModel.getCarousel_img3().getLink());
		existingContent.getCarousel_img4().setLink(contentModel.getCarousel_img4().getLink());
		existingContent.getCarousel_img5().setLink(contentModel.getCarousel_img5().getLink());
		existingContent.getPopular_courses().setValue(contentModel.getPopular_courses().getValue());
		existingContent.getPopular_courses_desc().setValue(contentModel.getPopular_courses_desc().getValue());
		existingContent.getModern_library().setValue(contentModel.getModern_library().getValue());
		existingContent.getModern_library_desc().setValue(contentModel.getModern_library_desc().getValue());
		existingContent.getQualified_teacher().setValue(contentModel.getQualified_teacher().getValue());
		existingContent.getQualified_teacher_desc().setValue(contentModel.getQualified_teacher_desc().getValue());
		existingContent.gethOPPA_image().setLink(contentModel.gethOPPA_image().getLink());
		existingContent.getTitle().setValue(contentModel.getTitle().getValue());
		existingContent.getAbout_desc1().setValue(contentModel.getAbout_desc1().getValue());
		existingContent.getAbout_desc2().setValue(contentModel.getAbout_desc2().getValue());
		existingContent.getHappy_students().setValue(contentModel.getHappy_students().getValue());
		existingContent.getTeachers().setValue(contentModel.getTeachers().getValue());
		existingContent.getRead_more().setValue(contentModel.getRead_more().getValue());
		existingContent.getInfo_title().setValue(contentModel.getInfo_title().getValue());
		existingContent.getView_all_courses().setValue(contentModel.getView_all_courses().getValue());
		existingContent.getUpcoming().setValue(contentModel.getUpcoming().getValue());
		existingContent.getEvents().setValue(contentModel.getEvents().getValue());
		existingContent.getFrequently_ask().setValue(contentModel.getFrequently_ask().getValue());
		existingContent.getQuestion().setValue(contentModel.getQuestion().getValue());
		existingContent.getFaq_titile_1().setValue(contentModel.getFaq_titile_1().getValue());
		existingContent.getFaq_desc_1().setValue(contentModel.getFaq_desc_1().getValue());
		existingContent.getFaq_titile_2().setValue(contentModel.getFaq_titile_2().getValue());
		existingContent.getFaq_desc_2().setValue(contentModel.getFaq_desc_2().getValue());
		existingContent.getFaq_titile_3().setValue(contentModel.getFaq_titile_3().getValue());
		existingContent.getFaq_desc_3().setValue(contentModel.getFaq_desc_3().getValue());
		existingContent.getCard_title().setValue(contentModel.getCard_title().getValue());
		existingContent.getCard_desc().setValue(contentModel.getCard_desc().getValue());
		existingContent.getCard_btn().setValue(contentModel.getCard_btn().getValue());
		existingContent.getcA().setValue(contentModel.getcA().getValue());
		existingContent.getCdac_full_address().setValue(contentModel.getCdac_full_address().getValue());
		existingContent.getCopyright().setValue(contentModel.getCopyright().getValue());
		existingContent.getDesign_develop().setValue(contentModel.getDesign_develop().getValue());
		existingContent.getFooterPoweredBy().setLink(contentModel.getFooterPoweredBy().getLink());
		existingContent.getFooterMeghS().setLink(contentModel.getFooterMeghS().getLink());
		existingContent.getFooterHelp().setLink(contentModel.getFooterHelp().getLink());
		existingContent.getPowerby1().setValue(contentModel.getPowerby1().getValue());
		existingContent.getMegh1().setValue(contentModel.getMegh1().getValue());

		boolean success = saveContentToFile(existingContent, language);
		if (success) {
			return new GlobalReponse(200, "Data updated successfully");
		} else {
			return new GlobalReponse(500, "Failed to update data");
		}

		// return new GlobalReponse(200, "Data updated successfully SSS");

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
		// Backend\\src\\main\\java\\com\\ModelContent\\modelContent\\json\\" +
		// fileName;
		return "C:\\Users\\samnayakawadi\\Downloads\\" + fileName;
	}
}

package com.ModelContent.modelContent.service.main;

import org.springframework.stereotype.Service;

import com.ModelContent.modelContent.dto.ContentModelDTO;
import com.ModelContent.modelContent.model.ContentModel;
import com.ModelContent.modelContent.response.GlobalReponse;

@Service
public interface ContentService {

    ContentModel getContentModel(String language);

    GlobalReponse updateContentModel(ContentModelDTO contentModelDTO, String language);

}
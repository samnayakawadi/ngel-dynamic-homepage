package com.ModelContent.modelContent.controller;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ModelContent.modelContent.dto.ContentModelDTO;
import com.ModelContent.modelContent.model.ContentModel;
import com.ModelContent.modelContent.response.GlobalReponse;
import com.ModelContent.modelContent.service.main.ContentService;

@RestController
@RequestMapping("/content")
@CrossOrigin(origins = "*")
@Validated
public class ContentController {

	@Autowired
	private ContentService contentService;

	@RolesAllowed("admin")
	@GetMapping("/{language}")
	public ContentModel getContentModel(
			@PathVariable @Pattern(regexp = "^[a-z]+$", message = "Only a-z alphabets are allowed") @Size(min = 1, max = 3, message = "Allowed Characters are 1 to 3") String language) {
		return contentService.getContentModel(language);
	}

	@RolesAllowed("admin")
	@PutMapping("/{language}")
	public GlobalReponse updateContentModel(
			@PathVariable @Pattern(regexp = "^[a-z]+$", message = "Only a-z alphabets are allowed") @Size(min = 1, max = 3, message = "Allowed Characters are 1 to 3") String language,
			@Valid @RequestBody ContentModelDTO contentModelDTO)
			throws IllegalArgumentException, IllegalAccessException {
		return contentService.updateContentModel(contentModelDTO, language);
	}

}
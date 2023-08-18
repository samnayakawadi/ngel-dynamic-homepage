package com.ModelContent.modelContent.controller;

import javax.validation.Valid;

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
// import com.ModelContent.modelContent.model.ContentModel;
import com.ModelContent.modelContent.response.GlobalReponse;
import com.ModelContent.modelContent.service.main.ContentService;


@RestController
@RequestMapping("/content")
@CrossOrigin(origins = "*")
@Validated
public class ContentController {

	@Autowired
	private ContentService contentService;

	@GetMapping("/{language}")
	public ContentModel getContentModel(@PathVariable String language) {
		return contentService.getContentModel(language);
	}

	@PutMapping("/{language}")
	public GlobalReponse updateContentModel( @PathVariable String language, @Valid @RequestBody ContentModelDTO contentModelDTO) throws IllegalArgumentException, IllegalAccessException	 {
		return contentService.updateContentModel(contentModelDTO, language);
	}
	
}


















// @GetMapping("/{language}")
// public ContentModel getContentModel(@PathVariable String language) {
// return contentService.getContentModel(language);
// }

// @PutMapping("/{language}")
// public GlobalReponse updateContentModel(@PathVariable String language,
// @RequestBody ContentModelDTO contentModelDTO) {
// return contentService.updateContentModel(contentModelDTO, language);
// }

// @PostMapping
// public ContentModel addContentModel(@RequestBody ContentModel contentModel) {
// return contentService.addContentModel(contentModel);
// }

// @DeleteMapping("/{deleteId}")
// public void deleteContentModel(@PathVariable long id) {
// contentService.deleteContentModel(id);
// }

// @PostMapping("/ContentModel")
// public ContentModel addContentModel(@RequestBody ContentModel contentModel)
// {
// return this.contentService.addContentModel(contentModel);
// }

// @GetMapping("/textTypeContent")
// public List<TextTypeContent> getTextTypeContent()
// {
// return this.contentService.getTextTypeContent();
// }
//
// @GetMapping("/fileTypeContent")
// public List<FileTypeContent> getFiletypeContent()
// {
// return this.contentService.getFileTypeContent();
// }
//
// @PostMapping("/textTypeContent")
// public TextTypeContent addTextTypeContent(@RequestBody TextTypeContent
// textTypeContent)
// {
// return this.contentService.addTextTypeContent(textTypeContent);
//
// }
package com.ModelContent.modelContent.dto.data.LinkTypeDto;

import com.ModelContent.modelContent.document.ContentModel.linkTypeContent.data.LinkTypeLinkcontentData;

import javax.validation.Valid;

public class LinkTypeContentDTO {
    @Valid
    private LinkTypeTitleContentData title;
    @Valid
    private LinkTypeLinkcontentData link;

    public LinkTypeContentDTO(LinkTypeTitleContentData title, LinkTypeLinkcontentData link) {
        this.title = title;
        this.link = link;
    }

    public LinkTypeContentDTO() {
    }

    public LinkTypeTitleContentData getTitle() {
        return title;
    }

    public void setTitle(LinkTypeTitleContentData title) {
        this.title = title;
    }

    public LinkTypeLinkcontentData getLink() {
        return link;
    }

    public void setLink(LinkTypeLinkcontentData link) {
        this.link = link;
    }

}

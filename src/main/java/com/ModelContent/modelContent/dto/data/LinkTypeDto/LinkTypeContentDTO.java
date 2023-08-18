package com.ModelContent.modelContent.dto.data.LinkTypeDto;

import javax.validation.Valid;


public class LinkTypeContentDTO {
    @Valid
    private LinkTypeTitleContentData title;
    @Valid
    private LinkTypeLinkContentData link;

    public LinkTypeContentDTO(LinkTypeTitleContentData title, LinkTypeLinkContentData link) {
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

    public LinkTypeLinkContentData getLink() {
        return link;
    }

    public void setLink(LinkTypeLinkContentData link) {
        this.link = link;
    }

}

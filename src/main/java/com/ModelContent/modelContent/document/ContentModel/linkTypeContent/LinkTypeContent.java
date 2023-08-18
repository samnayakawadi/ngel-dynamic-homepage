package com.ModelContent.modelContent.document.ContentModel.linkTypeContent;

import com.ModelContent.modelContent.document.ContentModel.linkTypeContent.data.LinkTypeLinkcontentData;
import com.ModelContent.modelContent.document.ContentModel.linkTypeContent.data.LinkTypeTitleContentData;

public class LinkTypeContent {
    private String type;
    private LinkTypeTitleContentData title;
    private LinkTypeLinkcontentData link;

    public LinkTypeContent() {

    }

    public LinkTypeContent(String type, LinkTypeTitleContentData title, LinkTypeLinkcontentData link) {
        this.type = type;
        this.title = title;
        this.link = link;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LinkTypeTitleContentData getTitle() {
        return this.title;
    }

    public void setTitle(LinkTypeTitleContentData title) {
        this.title = title;
    }

    public LinkTypeLinkcontentData getLink() {
        return this.link;
    }

    public void setLink(LinkTypeLinkcontentData link) {
        this.link = link;
    }
}

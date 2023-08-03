package com.ModelContent.modelContent.dto;

import com.ModelContent.modelContent.dto.data.FileTypeContentDTO;
import com.ModelContent.modelContent.dto.data.TextTypeContentDTO;
import com.ModelContent.modelContent.dto.data.LinkTypeDto.LinkTypeContentDTO;

import jakarta.validation.Valid;

public class ContentModelDTO {

    @Valid
    public TextTypeContentDTO cdac_address;
    @Valid
    public TextTypeContentDTO have_questions;
    @Valid
    public TextTypeContentDTO log_in;
    @Valid
    public TextTypeContentDTO register;
    @Valid
    public FileTypeContentDTO megh_Logo;
    @Valid
    public TextTypeContentDTO call_us_now;
    @Valid
    public LinkTypeContentDTO call_us_phone;
    @Valid
    public TextTypeContentDTO enquiry_us;
    @Valid
    public LinkTypeContentDTO enquiry_us_id;
    @Valid
    public TextTypeContentDTO home;
    @Valid
    public TextTypeContentDTO about_us;
    @Valid
    public TextTypeContentDTO courses;
    @Valid
    public FileTypeContentDTO carousel_img1;
    @Valid
    public FileTypeContentDTO carousel_img2;
    @Valid
    public FileTypeContentDTO carousel_img3;
    @Valid
    public FileTypeContentDTO carousel_img4;
    @Valid
    public FileTypeContentDTO carousel_img5;
    @Valid
    public TextTypeContentDTO popular_courses;
    @Valid
    public TextTypeContentDTO popular_courses_desc;
    @Valid
    public TextTypeContentDTO modern_library;
    @Valid
    public TextTypeContentDTO modern_library_desc;
    @Valid
    public TextTypeContentDTO qualified_teacher;
    @Valid
    public TextTypeContentDTO qualified_teacher_desc;
    @Valid
    public FileTypeContentDTO hOPPA_image;
    @Valid
    public TextTypeContentDTO title;
    @Valid
    public TextTypeContentDTO about_desc1;
    @Valid
    public TextTypeContentDTO about_desc2;
    @Valid
    public TextTypeContentDTO happy_students;
    @Valid
    public TextTypeContentDTO teachers;
    @Valid
    public TextTypeContentDTO coursess;
    @Valid
    public TextTypeContentDTO read_more;
    @Valid
    public TextTypeContentDTO info_title;
    @Valid
    public TextTypeContentDTO view_all_courses;
    @Valid
    public TextTypeContentDTO upcoming;
    @Valid
    public TextTypeContentDTO events;
    @Valid
    public TextTypeContentDTO frequently_ask;
    @Valid
    public TextTypeContentDTO question;
    @Valid
    public TextTypeContentDTO faq_titile_1;
    @Valid
    public TextTypeContentDTO faq_desc_1;
    @Valid
    public TextTypeContentDTO faq_titile_2;
    @Valid
    public TextTypeContentDTO faq_desc_2;
    @Valid
    public TextTypeContentDTO faq_titile_3;
    @Valid
    public TextTypeContentDTO faq_desc_3;
    @Valid
    public TextTypeContentDTO card_title;
    @Valid
    public TextTypeContentDTO card_desc;
    @Valid
    public TextTypeContentDTO card_btn;
    @Valid
    public TextTypeContentDTO cA;
    @Valid
    public TextTypeContentDTO cdac_full_address;
    @Valid
    public TextTypeContentDTO copyright;
    @Valid
    public TextTypeContentDTO design_develop;
    @Valid
    public TextTypeContentDTO usefull_links;
    @Valid
    public LinkTypeContentDTO footerPoweredBy;
    @Valid
    public LinkTypeContentDTO footerMeghS;
    @Valid
    public LinkTypeContentDTO footerHelp;
    @Valid
    public TextTypeContentDTO powerby1;
    @Valid
    public TextTypeContentDTO megh1;
    
    public ContentModelDTO(TextTypeContentDTO cdac_address, TextTypeContentDTO have_questions,
            TextTypeContentDTO log_in, TextTypeContentDTO register, FileTypeContentDTO megh_Logo,
            TextTypeContentDTO call_us_now, LinkTypeContentDTO call_us_phone, TextTypeContentDTO enquiry_us,
            LinkTypeContentDTO enquiry_us_id, TextTypeContentDTO home, TextTypeContentDTO about_us,
            TextTypeContentDTO courses, FileTypeContentDTO carousel_img1, FileTypeContentDTO carousel_img2,
            FileTypeContentDTO carousel_img3, FileTypeContentDTO carousel_img4, FileTypeContentDTO carousel_img5,
            TextTypeContentDTO popular_courses, TextTypeContentDTO popular_courses_desc,
            TextTypeContentDTO modern_library, TextTypeContentDTO modern_library_desc,
            TextTypeContentDTO qualified_teacher, TextTypeContentDTO qualified_teacher_desc,
            FileTypeContentDTO hOPPA_image, TextTypeContentDTO title, TextTypeContentDTO about_desc1,
            TextTypeContentDTO about_desc2, TextTypeContentDTO happy_students, TextTypeContentDTO teachers,
            TextTypeContentDTO coursess, TextTypeContentDTO read_more, TextTypeContentDTO info_title,
            TextTypeContentDTO view_all_courses, TextTypeContentDTO upcoming, TextTypeContentDTO events,
            TextTypeContentDTO frequently_ask, TextTypeContentDTO question, TextTypeContentDTO faq_titile_1,
            TextTypeContentDTO faq_desc_1, TextTypeContentDTO faq_titile_2, TextTypeContentDTO faq_desc_2,
            TextTypeContentDTO faq_titile_3, TextTypeContentDTO faq_desc_3, TextTypeContentDTO card_title,
            TextTypeContentDTO card_desc, TextTypeContentDTO card_btn, TextTypeContentDTO cA,
            TextTypeContentDTO cdac_full_address, TextTypeContentDTO copyright, TextTypeContentDTO design_develop,
            TextTypeContentDTO usefull_links, LinkTypeContentDTO footerPoweredBy, LinkTypeContentDTO footerMeghS,
            LinkTypeContentDTO footerHelp, TextTypeContentDTO powerby1, TextTypeContentDTO megh1) {
        this.cdac_address = cdac_address;
        this.have_questions = have_questions;
        this.log_in = log_in;
        this.register = register;
        this.megh_Logo = megh_Logo;
        this.call_us_now = call_us_now;
        this.call_us_phone = call_us_phone;
        this.enquiry_us = enquiry_us;
        this.enquiry_us_id = enquiry_us_id;
        this.home = home;
        this.about_us = about_us;
        this.courses = courses;
        this.carousel_img1 = carousel_img1;
        this.carousel_img2 = carousel_img2;
        this.carousel_img3 = carousel_img3;
        this.carousel_img4 = carousel_img4;
        this.carousel_img5 = carousel_img5;
        this.popular_courses = popular_courses;
        this.popular_courses_desc = popular_courses_desc;
        this.modern_library = modern_library;
        this.modern_library_desc = modern_library_desc;
        this.qualified_teacher = qualified_teacher;
        this.qualified_teacher_desc = qualified_teacher_desc;
        this.hOPPA_image = hOPPA_image;
        this.title = title;
        this.about_desc1 = about_desc1;
        this.about_desc2 = about_desc2;
        this.happy_students = happy_students;
        this.teachers = teachers;
        this.coursess = coursess;
        this.read_more = read_more;
        this.info_title = info_title;
        this.view_all_courses = view_all_courses;
        this.upcoming = upcoming;
        this.events = events;
        this.frequently_ask = frequently_ask;
        this.question = question;
        this.faq_titile_1 = faq_titile_1;
        this.faq_desc_1 = faq_desc_1;
        this.faq_titile_2 = faq_titile_2;
        this.faq_desc_2 = faq_desc_2;
        this.faq_titile_3 = faq_titile_3;
        this.faq_desc_3 = faq_desc_3;
        this.card_title = card_title;
        this.card_desc = card_desc;
        this.card_btn = card_btn;
        this.cA = cA;
        this.cdac_full_address = cdac_full_address;
        this.copyright = copyright;
        this.design_develop = design_develop;
        this.usefull_links = usefull_links;
        this.footerPoweredBy = footerPoweredBy;
        this.footerMeghS = footerMeghS;
        this.footerHelp = footerHelp;
        this.powerby1 = powerby1;
        this.megh1 = megh1;
    }

    public ContentModelDTO() {
    }

    public TextTypeContentDTO getCdac_address() {
        return cdac_address;
    }

    public void setCdac_address(TextTypeContentDTO cdac_address) {
        this.cdac_address = cdac_address;
    }

    public TextTypeContentDTO getHave_questions() {
        return have_questions;
    }

    public void setHave_questions(TextTypeContentDTO have_questions) {
        this.have_questions = have_questions;
    }

    public TextTypeContentDTO getLog_in() {
        return log_in;
    }

    public void setLog_in(TextTypeContentDTO log_in) {
        this.log_in = log_in;
    }

    public TextTypeContentDTO getRegister() {
        return register;
    }

    public void setRegister(TextTypeContentDTO register) {
        this.register = register;
    }

    public FileTypeContentDTO getMegh_Logo() {
        return megh_Logo;
    }

    public void setMegh_Logo(FileTypeContentDTO megh_Logo) {
        this.megh_Logo = megh_Logo;
    }

    public TextTypeContentDTO getCall_us_now() {
        return call_us_now;
    }

    public void setCall_us_now(TextTypeContentDTO call_us_now) {
        this.call_us_now = call_us_now;
    }

    public LinkTypeContentDTO getCall_us_phone() {
        return call_us_phone;
    }

    public void setCall_us_phone(LinkTypeContentDTO call_us_phone) {
        this.call_us_phone = call_us_phone;
    }

    public TextTypeContentDTO getEnquiry_us() {
        return enquiry_us;
    }

    public void setEnquiry_us(TextTypeContentDTO enquiry_us) {
        this.enquiry_us = enquiry_us;
    }

    public LinkTypeContentDTO getEnquiry_us_id() {
        return enquiry_us_id;
    }

    public void setEnquiry_us_id(LinkTypeContentDTO enquiry_us_id) {
        this.enquiry_us_id = enquiry_us_id;
    }

    public TextTypeContentDTO getHome() {
        return home;
    }

    public void setHome(TextTypeContentDTO home) {
        this.home = home;
    }

    public TextTypeContentDTO getAbout_us() {
        return about_us;
    }

    public void setAbout_us(TextTypeContentDTO about_us) {
        this.about_us = about_us;
    }

    public TextTypeContentDTO getCourses() {
        return courses;
    }

    public void setCourses(TextTypeContentDTO courses) {
        this.courses = courses;
    }

    public FileTypeContentDTO getCarousel_img1() {
        return carousel_img1;
    }

    public void setCarousel_img1(FileTypeContentDTO carousel_img1) {
        this.carousel_img1 = carousel_img1;
    }

    public FileTypeContentDTO getCarousel_img2() {
        return carousel_img2;
    }

    public void setCarousel_img2(FileTypeContentDTO carousel_img2) {
        this.carousel_img2 = carousel_img2;
    }

    public FileTypeContentDTO getCarousel_img3() {
        return carousel_img3;
    }

    public void setCarousel_img3(FileTypeContentDTO carousel_img3) {
        this.carousel_img3 = carousel_img3;
    }

    public FileTypeContentDTO getCarousel_img4() {
        return carousel_img4;
    }

    public void setCarousel_img4(FileTypeContentDTO carousel_img4) {
        this.carousel_img4 = carousel_img4;
    }

    public FileTypeContentDTO getCarousel_img5() {
        return carousel_img5;
    }

    public void setCarousel_img5(FileTypeContentDTO carousel_img5) {
        this.carousel_img5 = carousel_img5;
    }

    public TextTypeContentDTO getPopular_courses() {
        return popular_courses;
    }

    public void setPopular_courses(TextTypeContentDTO popular_courses) {
        this.popular_courses = popular_courses;
    }

    public TextTypeContentDTO getPopular_courses_desc() {
        return popular_courses_desc;
    }

    public void setPopular_courses_desc(TextTypeContentDTO popular_courses_desc) {
        this.popular_courses_desc = popular_courses_desc;
    }

    public TextTypeContentDTO getModern_library() {
        return modern_library;
    }

    public void setModern_library(TextTypeContentDTO modern_library) {
        this.modern_library = modern_library;
    }

    public TextTypeContentDTO getModern_library_desc() {
        return modern_library_desc;
    }

    public void setModern_library_desc(TextTypeContentDTO modern_library_desc) {
        this.modern_library_desc = modern_library_desc;
    }

    public TextTypeContentDTO getQualified_teacher() {
        return qualified_teacher;
    }

    public void setQualified_teacher(TextTypeContentDTO qualified_teacher) {
        this.qualified_teacher = qualified_teacher;
    }

    public TextTypeContentDTO getQualified_teacher_desc() {
        return qualified_teacher_desc;
    }

    public void setQualified_teacher_desc(TextTypeContentDTO qualified_teacher_desc) {
        this.qualified_teacher_desc = qualified_teacher_desc;
    }

    public FileTypeContentDTO gethOPPA_image() {
        return hOPPA_image;
    }

    public void sethOPPA_image(FileTypeContentDTO hOPPA_image) {
        this.hOPPA_image = hOPPA_image;
    }

    public TextTypeContentDTO getTitle() {
        return title;
    }

    public void setTitle(TextTypeContentDTO title) {
        this.title = title;
    }

    public TextTypeContentDTO getAbout_desc1() {
        return about_desc1;
    }

    public void setAbout_desc1(TextTypeContentDTO about_desc1) {
        this.about_desc1 = about_desc1;
    }

    public TextTypeContentDTO getAbout_desc2() {
        return about_desc2;
    }

    public void setAbout_desc2(TextTypeContentDTO about_desc2) {
        this.about_desc2 = about_desc2;
    }

    public TextTypeContentDTO getHappy_students() {
        return happy_students;
    }

    public void setHappy_students(TextTypeContentDTO happy_students) {
        this.happy_students = happy_students;
    }

    public TextTypeContentDTO getTeachers() {
        return teachers;
    }

    public void setTeachers(TextTypeContentDTO teachers) {
        this.teachers = teachers;
    }

    public TextTypeContentDTO getCoursess() {
        return coursess;
    }

    public void setCoursess(TextTypeContentDTO coursess) {
        this.coursess = coursess;
    }

    public TextTypeContentDTO getRead_more() {
        return read_more;
    }

    public void setRead_more(TextTypeContentDTO read_more) {
        this.read_more = read_more;
    }

    public TextTypeContentDTO getInfo_title() {
        return info_title;
    }

    public void setInfo_title(TextTypeContentDTO info_title) {
        this.info_title = info_title;
    }

    public TextTypeContentDTO getView_all_courses() {
        return view_all_courses;
    }

    public void setView_all_courses(TextTypeContentDTO view_all_courses) {
        this.view_all_courses = view_all_courses;
    }

    public TextTypeContentDTO getUpcoming() {
        return upcoming;
    }

    public void setUpcoming(TextTypeContentDTO upcoming) {
        this.upcoming = upcoming;
    }

    public TextTypeContentDTO getEvents() {
        return events;
    }

    public void setEvents(TextTypeContentDTO events) {
        this.events = events;
    }

    public TextTypeContentDTO getFrequently_ask() {
        return frequently_ask;
    }

    public void setFrequently_ask(TextTypeContentDTO frequently_ask) {
        this.frequently_ask = frequently_ask;
    }

    public TextTypeContentDTO getQuestion() {
        return question;
    }

    public void setQuestion(TextTypeContentDTO question) {
        this.question = question;
    }

    public TextTypeContentDTO getFaq_titile_1() {
        return faq_titile_1;
    }

    public void setFaq_titile_1(TextTypeContentDTO faq_titile_1) {
        this.faq_titile_1 = faq_titile_1;
    }

    public TextTypeContentDTO getFaq_desc_1() {
        return faq_desc_1;
    }

    public void setFaq_desc_1(TextTypeContentDTO faq_desc_1) {
        this.faq_desc_1 = faq_desc_1;
    }

    public TextTypeContentDTO getFaq_titile_2() {
        return faq_titile_2;
    }

    public void setFaq_titile_2(TextTypeContentDTO faq_titile_2) {
        this.faq_titile_2 = faq_titile_2;
    }

    public TextTypeContentDTO getFaq_desc_2() {
        return faq_desc_2;
    }

    public void setFaq_desc_2(TextTypeContentDTO faq_desc_2) {
        this.faq_desc_2 = faq_desc_2;
    }

    public TextTypeContentDTO getFaq_titile_3() {
        return faq_titile_3;
    }

    public void setFaq_titile_3(TextTypeContentDTO faq_titile_3) {
        this.faq_titile_3 = faq_titile_3;
    }

    public TextTypeContentDTO getFaq_desc_3() {
        return faq_desc_3;
    }

    public void setFaq_desc_3(TextTypeContentDTO faq_desc_3) {
        this.faq_desc_3 = faq_desc_3;
    }

    public TextTypeContentDTO getCard_title() {
        return card_title;
    }

    public void setCard_title(TextTypeContentDTO card_title) {
        this.card_title = card_title;
    }

    public TextTypeContentDTO getCard_desc() {
        return card_desc;
    }

    public void setCard_desc(TextTypeContentDTO card_desc) {
        this.card_desc = card_desc;
    }

    public TextTypeContentDTO getCard_btn() {
        return card_btn;
    }

    public void setCard_btn(TextTypeContentDTO card_btn) {
        this.card_btn = card_btn;
    }

    public TextTypeContentDTO getcA() {
        return cA;
    }

    public void setcA(TextTypeContentDTO cA) {
        this.cA = cA;
    }

    public TextTypeContentDTO getCdac_full_address() {
        return cdac_full_address;
    }

    public void setCdac_full_address(TextTypeContentDTO cdac_full_address) {
        this.cdac_full_address = cdac_full_address;
    }

    public TextTypeContentDTO getCopyright() {
        return copyright;
    }

    public void setCopyright(TextTypeContentDTO copyright) {
        this.copyright = copyright;
    }

    public TextTypeContentDTO getDesign_develop() {
        return design_develop;
    }

    public void setDesign_develop(TextTypeContentDTO design_develop) {
        this.design_develop = design_develop;
    }

    public TextTypeContentDTO getUsefull_links() {
        return usefull_links;
    }

    public void setUsefull_links(TextTypeContentDTO usefull_links) {
        this.usefull_links = usefull_links;
    }

    public LinkTypeContentDTO getFooterPoweredBy() {
        return footerPoweredBy;
    }

    public void setFooterPoweredBy(LinkTypeContentDTO footerPoweredBy) {
        this.footerPoweredBy = footerPoweredBy;
    }

    public LinkTypeContentDTO getFooterMeghS() {
        return footerMeghS;
    }

    public void setFooterMeghS(LinkTypeContentDTO footerMeghS) {
        this.footerMeghS = footerMeghS;
    }

    public LinkTypeContentDTO getFooterHelp() {
        return footerHelp;
    }

    public void setFooterHelp(LinkTypeContentDTO footerHelp) {
        this.footerHelp = footerHelp;
    }

    public TextTypeContentDTO getPowerby1() {
        return powerby1;
    }

    public void setPowerby1(TextTypeContentDTO powerby1) {
        this.powerby1 = powerby1;
    }

    public TextTypeContentDTO getMegh1() {
        return megh1;
    }

    public void setMegh1(TextTypeContentDTO megh1) {
        this.megh1 = megh1;
    }

}

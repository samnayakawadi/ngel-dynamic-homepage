package com.ModelContent.modelContent.model;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.ModelContent.modelContent.document.ContentModel.fileTypeContent.FileTypeContent;
import com.ModelContent.modelContent.document.ContentModel.linkTypeContent.LinkTypeContent;
import com.ModelContent.modelContent.document.ContentModel.textTypeContent.TextTypeContent;

@EntityScan
public class ContentModel {

	public TextTypeContent cdac_address;
	public TextTypeContent have_questions;
	public TextTypeContent log_in;
	public TextTypeContent register;
	public FileTypeContent megh_Logo;
	public TextTypeContent call_us_now;
	public LinkTypeContent call_us_phone;
	public TextTypeContent enquiry_us;
	public LinkTypeContent enquiry_us_id;
	public TextTypeContent home;
	public TextTypeContent about_us;
	public TextTypeContent courses;
	public FileTypeContent carousel_img1;
	public FileTypeContent carousel_img2;
	public FileTypeContent carousel_img3;
	public FileTypeContent carousel_img4;
	public FileTypeContent carousel_img5;
	public TextTypeContent popular_courses;
	public TextTypeContent popular_courses_desc;
	public TextTypeContent modern_library;
	public TextTypeContent modern_library_desc;
	public TextTypeContent qualified_teacher;
	public TextTypeContent qualified_teacher_desc;
	public TextTypeContent title;
	public TextTypeContent about_desc1;
	public TextTypeContent about_desc2;
	public TextTypeContent happy_students;
	public TextTypeContent teachers;
	public TextTypeContent coursess;
	public TextTypeContent read_more;
	public TextTypeContent info_title;
	public TextTypeContent view_all_courses;
	public TextTypeContent upcoming;
	public TextTypeContent events;
	public TextTypeContent frequently_ask;
	public TextTypeContent question;
	public TextTypeContent faq_titile_1;
	public TextTypeContent faq_desc_1;
	public TextTypeContent faq_titile_2;
	public TextTypeContent faq_desc_2;
	public TextTypeContent faq_titile_3;
	public TextTypeContent faq_desc_3;
	public TextTypeContent card_title;
	public TextTypeContent card_desc;
	public TextTypeContent card_btn;
	public TextTypeContent cA;
	public TextTypeContent cdac_full_address;
	public TextTypeContent copyright;
	public TextTypeContent design_develop;
	public TextTypeContent usefull_links;
	public LinkTypeContent footerPoweredBy;
	public LinkTypeContent footerMeghS;
	public LinkTypeContent footerHelp;
	public TextTypeContent powerby1;
	public TextTypeContent megh1;


	public ContentModel() {
	}

	public ContentModel(TextTypeContent cdac_address, TextTypeContent have_questions, TextTypeContent log_in, TextTypeContent register, FileTypeContent megh_Logo, TextTypeContent call_us_now, LinkTypeContent call_us_phone, TextTypeContent enquiry_us, LinkTypeContent enquiry_us_id, TextTypeContent home, TextTypeContent about_us, TextTypeContent courses, FileTypeContent carousel_img1, FileTypeContent carousel_img2, FileTypeContent carousel_img3, FileTypeContent carousel_img4, FileTypeContent carousel_img5, TextTypeContent popular_courses, TextTypeContent popular_courses_desc, TextTypeContent modern_library, TextTypeContent modern_library_desc, TextTypeContent qualified_teacher, TextTypeContent qualified_teacher_desc, TextTypeContent title, TextTypeContent about_desc1, TextTypeContent about_desc2, TextTypeContent happy_students, TextTypeContent teachers, TextTypeContent coursess, TextTypeContent read_more, TextTypeContent info_title, TextTypeContent view_all_courses, TextTypeContent upcoming, TextTypeContent events, TextTypeContent frequently_ask, TextTypeContent question, TextTypeContent faq_titile_1, TextTypeContent faq_desc_1, TextTypeContent faq_titile_2, TextTypeContent faq_desc_2, TextTypeContent faq_titile_3, TextTypeContent faq_desc_3, TextTypeContent card_title, TextTypeContent card_desc, TextTypeContent card_btn, TextTypeContent cA, TextTypeContent cdac_full_address, TextTypeContent copyright, TextTypeContent design_develop, TextTypeContent usefull_links, LinkTypeContent footerPoweredBy, LinkTypeContent footerMeghS, LinkTypeContent footerHelp, TextTypeContent powerby1, TextTypeContent megh1) {
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

	public TextTypeContent getCdac_address() {
		return this.cdac_address;
	}

	public void setCdac_address(TextTypeContent cdac_address) {
		this.cdac_address = cdac_address;
	}

	public TextTypeContent getHave_questions() {
		return this.have_questions;
	}

	public void setHave_questions(TextTypeContent have_questions) {
		this.have_questions = have_questions;
	}

	public TextTypeContent getLog_in() {
		return this.log_in;
	}

	public void setLog_in(TextTypeContent log_in) {
		this.log_in = log_in;
	}

	public TextTypeContent getRegister() {
		return this.register;
	}

	public void setRegister(TextTypeContent register) {
		this.register = register;
	}

	public FileTypeContent getMegh_Logo() {
		return this.megh_Logo;
	}

	public void setMegh_Logo(FileTypeContent megh_Logo) {
		this.megh_Logo = megh_Logo;
	}

	public TextTypeContent getCall_us_now() {
		return this.call_us_now;
	}

	public void setCall_us_now(TextTypeContent call_us_now) {
		this.call_us_now = call_us_now;
	}

	public LinkTypeContent getCall_us_phone() {
		return this.call_us_phone;
	}

	public void setCall_us_phone(LinkTypeContent call_us_phone) {
		this.call_us_phone = call_us_phone;
	}

	public TextTypeContent getEnquiry_us() {
		return this.enquiry_us;
	}

	public void setEnquiry_us(TextTypeContent enquiry_us) {
		this.enquiry_us = enquiry_us;
	}

	public LinkTypeContent getEnquiry_us_id() {
		return this.enquiry_us_id;
	}

	public void setEnquiry_us_id(LinkTypeContent enquiry_us_id) {
		this.enquiry_us_id = enquiry_us_id;
	}

	public TextTypeContent getHome() {
		return this.home;
	}

	public void setHome(TextTypeContent home) {
		this.home = home;
	}

	public TextTypeContent getAbout_us() {
		return this.about_us;
	}

	public void setAbout_us(TextTypeContent about_us) {
		this.about_us = about_us;
	}

	public TextTypeContent getCourses() {
		return this.courses;
	}

	public void setCourses(TextTypeContent courses) {
		this.courses = courses;
	}

	public FileTypeContent getCarousel_img1() {
		return this.carousel_img1;
	}

	public void setCarousel_img1(FileTypeContent carousel_img1) {
		this.carousel_img1 = carousel_img1;
	}

	public FileTypeContent getCarousel_img2() {
		return this.carousel_img2;
	}

	public void setCarousel_img2(FileTypeContent carousel_img2) {
		this.carousel_img2 = carousel_img2;
	}

	public FileTypeContent getCarousel_img3() {
		return this.carousel_img3;
	}

	public void setCarousel_img3(FileTypeContent carousel_img3) {
		this.carousel_img3 = carousel_img3;
	}

	public FileTypeContent getCarousel_img4() {
		return this.carousel_img4;
	}

	public void setCarousel_img4(FileTypeContent carousel_img4) {
		this.carousel_img4 = carousel_img4;
	}

	public FileTypeContent getCarousel_img5() {
		return this.carousel_img5;
	}

	public void setCarousel_img5(FileTypeContent carousel_img5) {
		this.carousel_img5 = carousel_img5;
	}

	public TextTypeContent getPopular_courses() {
		return this.popular_courses;
	}

	public void setPopular_courses(TextTypeContent popular_courses) {
		this.popular_courses = popular_courses;
	}

	public TextTypeContent getPopular_courses_desc() {
		return this.popular_courses_desc;
	}

	public void setPopular_courses_desc(TextTypeContent popular_courses_desc) {
		this.popular_courses_desc = popular_courses_desc;
	}

	public TextTypeContent getModern_library() {
		return this.modern_library;
	}

	public void setModern_library(TextTypeContent modern_library) {
		this.modern_library = modern_library;
	}

	public TextTypeContent getModern_library_desc() {
		return this.modern_library_desc;
	}

	public void setModern_library_desc(TextTypeContent modern_library_desc) {
		this.modern_library_desc = modern_library_desc;
	}

	public TextTypeContent getQualified_teacher() {
		return this.qualified_teacher;
	}

	public void setQualified_teacher(TextTypeContent qualified_teacher) {
		this.qualified_teacher = qualified_teacher;
	}

	public TextTypeContent getQualified_teacher_desc() {
		return this.qualified_teacher_desc;
	}

	public void setQualified_teacher_desc(TextTypeContent qualified_teacher_desc) {
		this.qualified_teacher_desc = qualified_teacher_desc;
	}

	public TextTypeContent getTitle() {
		return this.title;
	}

	public void setTitle(TextTypeContent title) {
		this.title = title;
	}

	public TextTypeContent getAbout_desc1() {
		return this.about_desc1;
	}

	public void setAbout_desc1(TextTypeContent about_desc1) {
		this.about_desc1 = about_desc1;
	}

	public TextTypeContent getAbout_desc2() {
		return this.about_desc2;
	}

	public void setAbout_desc2(TextTypeContent about_desc2) {
		this.about_desc2 = about_desc2;
	}

	public TextTypeContent getHappy_students() {
		return this.happy_students;
	}

	public void setHappy_students(TextTypeContent happy_students) {
		this.happy_students = happy_students;
	}

	public TextTypeContent getTeachers() {
		return this.teachers;
	}

	public void setTeachers(TextTypeContent teachers) {
		this.teachers = teachers;
	}

	public TextTypeContent getCoursess() {
		return this.coursess;
	}

	public void setCoursess(TextTypeContent coursess) {
		this.coursess = coursess;
	}

	public TextTypeContent getRead_more() {
		return this.read_more;
	}

	public void setRead_more(TextTypeContent read_more) {
		this.read_more = read_more;
	}

	public TextTypeContent getInfo_title() {
		return this.info_title;
	}

	public void setInfo_title(TextTypeContent info_title) {
		this.info_title = info_title;
	}

	public TextTypeContent getView_all_courses() {
		return this.view_all_courses;
	}

	public void setView_all_courses(TextTypeContent view_all_courses) {
		this.view_all_courses = view_all_courses;
	}

	public TextTypeContent getUpcoming() {
		return this.upcoming;
	}

	public void setUpcoming(TextTypeContent upcoming) {
		this.upcoming = upcoming;
	}

	public TextTypeContent getEvents() {
		return this.events;
	}

	public void setEvents(TextTypeContent events) {
		this.events = events;
	}

	public TextTypeContent getFrequently_ask() {
		return this.frequently_ask;
	}

	public void setFrequently_ask(TextTypeContent frequently_ask) {
		this.frequently_ask = frequently_ask;
	}

	public TextTypeContent getQuestion() {
		return this.question;
	}

	public void setQuestion(TextTypeContent question) {
		this.question = question;
	}

	public TextTypeContent getFaq_titile_1() {
		return this.faq_titile_1;
	}

	public void setFaq_titile_1(TextTypeContent faq_titile_1) {
		this.faq_titile_1 = faq_titile_1;
	}

	public TextTypeContent getFaq_desc_1() {
		return this.faq_desc_1;
	}

	public void setFaq_desc_1(TextTypeContent faq_desc_1) {
		this.faq_desc_1 = faq_desc_1;
	}

	public TextTypeContent getFaq_titile_2() {
		return this.faq_titile_2;
	}

	public void setFaq_titile_2(TextTypeContent faq_titile_2) {
		this.faq_titile_2 = faq_titile_2;
	}

	public TextTypeContent getFaq_desc_2() {
		return this.faq_desc_2;
	}

	public void setFaq_desc_2(TextTypeContent faq_desc_2) {
		this.faq_desc_2 = faq_desc_2;
	}

	public TextTypeContent getFaq_titile_3() {
		return this.faq_titile_3;
	}

	public void setFaq_titile_3(TextTypeContent faq_titile_3) {
		this.faq_titile_3 = faq_titile_3;
	}

	public TextTypeContent getFaq_desc_3() {
		return this.faq_desc_3;
	}

	public void setFaq_desc_3(TextTypeContent faq_desc_3) {
		this.faq_desc_3 = faq_desc_3;
	}

	public TextTypeContent getCard_title() {
		return this.card_title;
	}

	public void setCard_title(TextTypeContent card_title) {
		this.card_title = card_title;
	}

	public TextTypeContent getCard_desc() {
		return this.card_desc;
	}

	public void setCard_desc(TextTypeContent card_desc) {
		this.card_desc = card_desc;
	}

	public TextTypeContent getCard_btn() {
		return this.card_btn;
	}

	public void setCard_btn(TextTypeContent card_btn) {
		this.card_btn = card_btn;
	}

	public TextTypeContent getCA() {
		return this.cA;
	}

	public void setCA(TextTypeContent cA) {
		this.cA = cA;
	}

	public TextTypeContent getCdac_full_address() {
		return this.cdac_full_address;
	}

	public void setCdac_full_address(TextTypeContent cdac_full_address) {
		this.cdac_full_address = cdac_full_address;
	}

	public TextTypeContent getCopyright() {
		return this.copyright;
	}

	public void setCopyright(TextTypeContent copyright) {
		this.copyright = copyright;
	}

	public TextTypeContent getDesign_develop() {
		return this.design_develop;
	}

	public void setDesign_develop(TextTypeContent design_develop) {
		this.design_develop = design_develop;
	}

	public TextTypeContent getUsefull_links() {
		return this.usefull_links;
	}

	public void setUsefull_links(TextTypeContent usefull_links) {
		this.usefull_links = usefull_links;
	}

	public LinkTypeContent getFooterPoweredBy() {
		return this.footerPoweredBy;
	}

	public void setFooterPoweredBy(LinkTypeContent footerPoweredBy) {
		this.footerPoweredBy = footerPoweredBy;
	}

	public LinkTypeContent getFooterMeghS() {
		return this.footerMeghS;
	}

	public void setFooterMeghS(LinkTypeContent footerMeghS) {
		this.footerMeghS = footerMeghS;
	}

	public LinkTypeContent getFooterHelp() {
		return this.footerHelp;
	}

	public void setFooterHelp(LinkTypeContent footerHelp) {
		this.footerHelp = footerHelp;
	}

	public TextTypeContent getPowerby1() {
		return this.powerby1;
	}

	public void setPowerby1(TextTypeContent powerby1) {
		this.powerby1 = powerby1;
	}

	public TextTypeContent getMegh1() {
		return this.megh1;
	}

	public void setMegh1(TextTypeContent megh1) {
		this.megh1 = megh1;
	}
	

}
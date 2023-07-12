package com.ModelContent.modelContent.response;

public class GlobalReponse {

	private Integer status;
	private String message;

	public GlobalReponse() {
		super();
	}

	public GlobalReponse(Integer status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}

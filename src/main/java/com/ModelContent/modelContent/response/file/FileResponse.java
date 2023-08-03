package com.ModelContent.modelContent.response.file;

public class FileResponse {
    private Integer status;
	private String message;
	private FileData fileData;

    public FileResponse() {
    }

    public FileResponse(Integer status, String message, FileData fileData) {
        this.status = status;
        this.message = message;
        this.fileData = fileData;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public FileData getFileData() {
        return this.fileData;
    }

    public void setFileData(FileData fileData) {
        this.fileData = fileData;
    }

}

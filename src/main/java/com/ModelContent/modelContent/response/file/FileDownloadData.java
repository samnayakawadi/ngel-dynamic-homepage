package com.ModelContent.modelContent.response.file;

public class FileDownloadData {
    private String fileId;
    private String fileName;
    private byte[] fileData;

    public FileDownloadData() {
    }

    public FileDownloadData(String fileId, String fileName, byte[] fileData) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.fileData = fileData;
    }

    public String getFileId() {
        return this.fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return this.fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

}

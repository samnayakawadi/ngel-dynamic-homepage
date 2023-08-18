package com.ModelContent.modelContent.service.main;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ModelContent.modelContent.response.file.FileResponse;

@Service
public interface FileService {
    public FileResponse addNewFile(MultipartFile file, String fileHash) throws IOException;

}
package com.ModelContent.modelContent.controller;

import java.io.IOException;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ModelContent.modelContent.response.file.FileResponse;
import com.ModelContent.modelContent.service.main.FileService;

@CrossOrigin(origins = "*")
@RestController
@Validated
public class FileController {

    @Autowired
    FileService fileService;

    @RolesAllowed("instructor")
    @PostMapping("/files/upload")
    public FileResponse addNewFile(@RequestParam("file") MultipartFile file,
            @RequestParam("fileHash") String fileHash)
            throws IOException {

        return fileService.addNewFile(file, fileHash);

    }

}
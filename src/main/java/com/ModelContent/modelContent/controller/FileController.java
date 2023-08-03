package com.ModelContent.modelContent.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ModelContent.modelContent.service.main.FileService;

import jakarta.annotation.security.RolesAllowed;

@CrossOrigin(origins = "*")
@RestController
@Validated
public class FileController {

    // private static final Logger logger =
    // LoggerFactory.getLogger(FileController.class);

    @Autowired
    FileService fileService;

    @RolesAllowed("instructor")
    @PostMapping("/files/upload")
    public ResponseEntity<?> addNewFile(@RequestParam("file") MultipartFile file)
            throws IOException {

        // String filename = FilenameUtils.getName(file.getOriginalFilename());

        // String filehash = MD5Hashing.generateMD5(Long.toString(file.getSize()));

        // if (filehash.equals(filesig)) {

        // if (filename.split("\\.").length <= 2 || FilenameUtils.getExtension(filename)
        // == null) {
        return new ResponseEntity<>(fileService.addNewFile(file), HttpStatus.OK);
        // } else {
        // return new ResponseEntity<>("double-extension-file",
        // HttpStatus.NOT_ACCEPTABLE);
        // }
        // } else {
        // return new ResponseEntity<>("InvalidFile", HttpStatus.OK);
        // }

        // try {
        // } catch (Exception e) {
        // e.printStackTrace();
        // logger.error(e.getMessage());
        // throw new GlobalCustomException(
        // new GlobalResponse(500, ERRORMESSAGE + e.getMessage()),
        // HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }

}
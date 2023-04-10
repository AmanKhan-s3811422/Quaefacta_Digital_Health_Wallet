package com.quaefactahealth.vaxapp.controller;

import com.quaefactahealth.vaxapp.services.S3StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/s3")
public class S3StorageController {

    private S3StorageService s3StorageService;

    @Autowired
    public S3StorageController(S3StorageService s3StorageService) {
        this.s3StorageService = s3StorageService;
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file,
                                             @RequestParam("file_type") String file_type,
                                             @RequestParam("user_id") String user_id) {
        return new ResponseEntity<>(s3StorageService.uploadFile(file, file_type, user_id), HttpStatus.OK);
    }

    @GetMapping("/download/{file_type}/{user_id}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String file_type,
                                                          @PathVariable String user_id) {
        byte[] data =  s3StorageService.downloadFile(file_type, user_id);
        if (data == null) {
            return ResponseEntity
                    .ok()
                    .body(null);
        }
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + file_type+"/"+user_id + "\"")
                .body(resource);
    }

    @GetMapping("/delete/{file_type}/{user_id}")
    public ResponseEntity<String> deleteFile(@PathVariable  String file_type,
                                             @PathVariable String user_id) {
        return new ResponseEntity<>(s3StorageService.deleteFile(file_type, user_id), HttpStatus.OK);
    }
}

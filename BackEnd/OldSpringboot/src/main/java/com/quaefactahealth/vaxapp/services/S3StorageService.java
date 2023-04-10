package com.quaefactahealth.vaxapp.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class S3StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    private AmazonS3 s3Client;
    @Autowired
    public S3StorageService(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file, String fileType, String userID) {
        File fileObj = convertMultiPartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileType+"/"+userID, fileObj));
        fileObj.delete();
        return "File uploaded : " + fileType + "/" + userID;
    }

    public byte[] downloadFile(String fileType, String userID) {
        try {
            S3Object s3Object = s3Client.getObject(bucketName, fileType+"/"+userID);
            S3ObjectInputStream inputStream = s3Object.getObjectContent();
            if (inputStream != null) {
                try {
                    byte[] content = IOUtils.toByteArray(inputStream);
                    return content;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (AmazonS3Exception e) {
            // Catches error when file doesn't exist. Do nothing
        }
        return null;
    }

    public String deleteFile(String fileType, String userID) {
        try {
            S3Object s3Object = s3Client.getObject(bucketName, fileType+"/"+userID);
        } catch (AmazonS3Exception e) {
            // Catches error when file doesn't exist. Do nothing
            return fileType+"/"+userID + " doesn't exist";
        }

        s3Client.deleteObject(bucketName, fileType+"/"+userID);
        return fileType+"/"+userID + " removed";
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}

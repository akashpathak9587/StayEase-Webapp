package com.example.stay_ease_webapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.stay_ease_webapp.exception.OurException;

import java.io.InputStream;

@Service
public class AWSS3Service {
    private static final String BUCKET_NAME="stay-ease-images";

    @Value("${aws.s3.access-key}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secret-key}")
    private String awsS3SecretKey;

    public String saveImagesToS3(MultipartFile photo) {
        try{
            String s3Filename = photo.getOriginalFilename();
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).withRegion(Regions.US_EAST_1).build();

            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");

            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME, s3Filename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
            return "https://"+ BUCKET_NAME + ".s3.amazonaws.com/" + s3Filename;
        } catch(Exception e){
            e.printStackTrace();
            throw new OurException("Unable to upload image to s3 bucket"+ e.getMessage());
        }
    }
}

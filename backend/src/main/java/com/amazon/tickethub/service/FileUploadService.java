package com.amazon.tickethub.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;

@Service
@Slf4j
public class FileUploadService {

    private final String uploadDir = "/uploads/events";
    private final String avatarUploadDir = "/uploads/avatars";

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
            Files.createDirectories(Paths.get(avatarUploadDir));
            log.info("Upload directory created at {} and {}", uploadDir, avatarUploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public String upload(MultipartFile file) throws IOException {
        return uploadToDir(file, uploadDir, "/uploads/events/");
    }

    public String uploadAvatar(MultipartFile file) throws IOException {
        return uploadToDir(file, avatarUploadDir, "/uploads/avatars/");
    }

    private String uploadToDir(MultipartFile file, String dir, String urlPrefix) throws IOException {
        String contentType = file.getContentType();
        if (!isImage(contentType)) {
            throw new IllegalArgumentException("Only PNG and JPEG images are allowed");
        }

        byte[] fileBytes = file.getBytes();
        String hash;
        try {
            hash = getSHA256Hash(fileBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new IOException("Could not hash file content", e);
        }
        String extension = getFileExtension(file.getOriginalFilename());
        String filename = hash + (extension.isEmpty() ? "" : "." + extension);
        Path filepath = Paths.get(dir, filename);

        if (!Files.exists(filepath)) {
            Files.write(filepath, fileBytes);
        }
        return urlPrefix + filename;
    }

    private boolean isImage(String contentType) {
        return contentType != null &&
                (contentType.equals("image/png") || contentType.equals("image/jpeg"));
    }

    private String getSHA256Hash(byte[] data) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(data);
        BigInteger number = new BigInteger(1, hashBytes);
        StringBuilder hexString = new StringBuilder(number.toString(16));
        while (hexString.length() < 64) {
            hexString.insert(0, '0');
        }
        return hexString.toString();
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1);
    }
}

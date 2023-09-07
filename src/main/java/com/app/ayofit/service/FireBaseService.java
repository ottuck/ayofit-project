package com.app.ayofit.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.mapper.FileMapper;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;

@Service
public class FireBaseService {

	@Autowired
	private FileMapper fileMapper;

	@Value("${app.firebase-bucket}")
	private String firebaseBucket;

	@Value("${app.firebase-configuration-file}")
	private String firebaseConfigPath;

	public String uploadFiles(MultipartFile file, String userId, String mealType) throws IOException {

		Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
		InputStream content = new ByteArrayInputStream(file.getBytes());

		String uuid = UUID.randomUUID().toString().split("-")[0];
		Blob blob = bucket.create(uuid, content, file.getContentType());
		System.out.println(blob.getMediaLink());
		// uuid , userid
		uuid = "https://firebasestorage.googleapis.com/v0/b/ayo-upload.appspot.com/o/" + uuid + "?alt=media";
		
		fileMapper.saveFile(uuid, userId, mealType);
		return uuid;

	}

	public void deleteFile(int fNo, String fUrl) {
		Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
		fUrl = fUrl.replace("https://firebasestorage.googleapis.com/v0/b/ayo-upload.appspot.com/o/", "");
		fUrl = fUrl.replace("?alt=media", "");
		System.out.println(fUrl);
		Blob blob = bucket.get(fUrl);
		System.out.println(blob);

		if (blob != null) {
			blob.delete();
			System.out.println("File deleted successfully");
		} else {
			 System.out.println("File not found");
		}
		
		fileMapper.deleteFile(fNo);

	}

}

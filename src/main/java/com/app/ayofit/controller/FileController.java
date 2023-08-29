package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.model.FileDTO;
import com.app.ayofit.service.FileDAO;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/file")
public class FileController {

	@Autowired
	private FileDAO fileDAO;

	@PostMapping("/upload-image")
	public void  uploadImg (@RequestPart("image") MultipartFile file, @RequestPart("userId") String userId ) {
		fileDAO.uploadImg(file, userId);
	}

	@GetMapping("/get-image/{userId}")
	public ResponseEntity<List<FileDTO>> getImg(@PathVariable("userId") String userId) {
		System.out.println(userId);
		List<FileDTO> imgs = fileDAO.getImg(userId);
		for (FileDTO f : imgs) {
			System.out.println(f);
			System.out.println(f.getfImg());
			
			String changePath = f.getfImg();
			System.out.println(changePath);
			f.setfImg(changePath);
		}
		
		
		return new ResponseEntity<>(imgs, HttpStatus.OK);
	}
	
//	@GetMapping("/get-image/{userId}")
//	public ResponseEntity<String> getImageUrl(@PathVariable("userId") String userId) {
//		// userId를 기반으로 이미지 URL 생성
//		String fileName = userId + ".jpg";
//		String imageUrl = imageUrlGenerator.generateImageUrl(fileName);
//		System.out.println(imageUrl);
//		System.out.println("==== 여기 옴");
//
//		return new ResponseEntity<>(imageUrl, HttpStatus.OK);
//	}

}

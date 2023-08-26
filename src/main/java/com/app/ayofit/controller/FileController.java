package com.app.ayofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.model.FileDTO;
import com.app.ayofit.service.FileDAO;

@RestController
@RequestMapping("/api/file")
public class FileController {
	
	@Autowired
	private FileDAO fileDAO;
	
	@PostMapping("/upload-image")
	public void  uploadImg (@RequestPart("image") MultipartFile file, @RequestPart("userId") String userId ) {
		fileDAO.uploadImg(file, userId);
	}
	
	
	
}

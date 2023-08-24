package com.app.ayofit.service;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileDAO {
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	public int uploadImg(MultipartFile file) {
		try {
			Resource path = resourceLoader.getResource("classpath:filetest/");
			System.out.println(path);
			 File uploadDirectory = path.getFile();
			System.out.println(uploadDirectory);
			
			// UUID로 파일 이름 생성
			String originalFilename = file.getOriginalFilename();
			String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
			String newFileName = UUID.randomUUID().toString() + extension;
			
			String saveFileName = file.getOriginalFilename();
			System.out.println(saveFileName);
			
			file.transferTo(new File(uploadDirectory+ "/" + newFileName));
			System.out.println("성공");
			} catch (Exception e) {
				e.printStackTrace();
				return 1;
			}
			return 0;
		
	}

}

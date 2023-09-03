package com.app.ayofit.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.mapper.FileMapper;
import com.app.ayofit.model.FileDTO;

@Service
public class FileDAO {

	@Autowired
	private ResourceLoader resourceLoader;

	private FileMapper fMapper;

	public FileDAO(FileMapper fMapper) {
		this.fMapper = fMapper;
	}

	public int uploadImg(MultipartFile file, String userId) {
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

			file.transferTo(new File(uploadDirectory + "/" + newFileName));
			System.out.println(uploadDirectory + "/" + newFileName);
			System.out.println("성공");

			FileDTO fDTO = new FileDTO();
			fDTO.setfId(userId);
			fDTO.setfImg(uploadDirectory + "/" + newFileName);

			if (fMapper.uploadImg(fDTO) == 1) {
				System.out.println("DB 등록 성공");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 1;
		}
		return 0;

	}

	public List<FileDTO> getImg(String userId) {
		return fMapper.getImg(userId);
	}

}

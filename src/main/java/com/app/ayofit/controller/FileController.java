package com.app.ayofit.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.model.FileDTO;
import com.app.ayofit.service.FileDAO;
import com.app.ayofit.service.FireBaseService;
@RestController
@RequestMapping("/api/file")
public class FileController {

	@Autowired
	private FileDAO fileDAO;

	@Autowired
	private FireBaseService fireBaseService;

	@PostMapping("/files")
	public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId, @RequestParam("mealType") String mealType )
			throws IOException {

		System.out.println(file);
		System.out.println(userId);

		if (file.isEmpty()) {
			return "is empty";
		}
		String url = fireBaseService.uploadFiles(file, userId,mealType);
		System.out.println(url);
		return url;

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
	
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteFile (@RequestParam("fNo") int fNo, @RequestParam("fUrl") String fUrl){
		System.out.println(fNo);
		System.out.println(fUrl);
		fireBaseService.deleteFile(fNo,fUrl);
		return new ResponseEntity<>("delete", HttpStatus.OK);
	}
	

}

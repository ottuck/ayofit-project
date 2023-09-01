package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FavDTO;
import com.app.ayofit.service.FavDAO;

@RestController
@RequestMapping("api/favorites")
public class FavController {
	
	@Autowired
	private FavDAO fDAO;
	
	@GetMapping("")
	public ResponseEntity<List<FavDTO>> getFavorites (@RequestParam("userId") String userId) {
		System.out.println(userId);
		
		List<FavDTO> favorites = fDAO.getFavorites(userId);
		return new ResponseEntity<>(favorites, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<String> regFavorites(@RequestBody List<Integer> nNos, @RequestParam("userId") String userId){
//		System.out.println(nNos);
//		System.out.println(userId);
		fDAO.regFavorites(nNos, userId);
		return ResponseEntity.ok("favorites registered successfully");
	}
	
	@DeleteMapping("")
	public ResponseEntity<String> deleteFavorites(@RequestParam("fNo") int no){
		
		fDAO.deleteFavorites(no);
		
		return ResponseEntity.ok("favorites registered successfully");
	}
	
}

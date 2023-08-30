package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FavDTO;
import com.app.ayofit.service.FavDAO;

@RestController
@RequestMapping("api/favorites")
public class FavController {
	
	@Autowired
	private FavDAO fDAO;
	
	@GetMapping("{userId}")
	public ResponseEntity<List<FavDTO>> getFavorites (@PathVariable("userId") String userId) {
		List<FavDTO> favorites = fDAO.getFavorites(userId);
		return new ResponseEntity<>(favorites, HttpStatus.OK);
	}
	
}

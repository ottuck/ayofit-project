package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<List<FavDTO>> getFavorites(@RequestParam("userId") String userId,
			@RequestParam("nNos") List<Integer> nNos) {
		List<FavDTO> favorites = fDAO.getFavorites(userId, nNos);
		return new ResponseEntity<>(favorites, HttpStatus.OK);
	}

	@PostMapping("")
	public ResponseEntity<String> regFavorites(@RequestParam("nNos") List<Integer> nNos) {
		System.out.println(nNos);
		fDAO.regFavorites(nNos);
		return ResponseEntity.ok("favorites registered successfully");
	}

}

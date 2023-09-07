package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.NutritionDTO;
import com.app.ayofit.service.NutritionDAO;

@RestController
@RequestMapping("/api/nutrition")
public class NutritionController {

	@Autowired
	private NutritionDAO nutritionService;

	@GetMapping("/daily/{userId}/{date}")
	public ResponseEntity<List<NutritionDTO>> getDailyNutrition(@PathVariable String userId,
			@PathVariable String date) {
		List<NutritionDTO> info = nutritionService.getDailyNutrition(userId, date);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

	@GetMapping("/weekly/{userId}/{startDate}/{endDate}")
	public ResponseEntity<List<NutritionDTO>> getWeeklyNutrition(
			@PathVariable String userId,
			@PathVariable String startDate,
			@PathVariable String endDate) {
		System.out.println(startDate);
		System.out.println(endDate);
		List<NutritionDTO> info = nutritionService.getWeeklyNutrition(userId, startDate, endDate);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

	@GetMapping("/monthly/{userId}/{startDate}/{endDate}")
	public ResponseEntity<List<NutritionDTO>> getMonthlyNutrition(
			@PathVariable String userId,
			@PathVariable String startDate,
			@PathVariable String endDate) {
		List<NutritionDTO> info = nutritionService.getMonthlyNutrition(userId, startDate, endDate);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

}

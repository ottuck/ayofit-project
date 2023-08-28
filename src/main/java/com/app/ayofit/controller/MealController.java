package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.MealDTO;
import com.app.ayofit.service.MealDAO;

@RestController
@RequestMapping("api/meal")
public class MealController {
	
	@Autowired
	private MealDAO mealDAO;
	
	@GetMapping("")
	public List<MealDTO> getAllMeal(){
		return mealDAO.getAllMeal();
	}
	
	@PostMapping("")
	public void regMeal(@RequestBody MealDTO mealDTO) {
		mealDAO.regMeal(mealDTO);
	}
	
	@DeleteMapping("{no}")
	public void delMeal(@PathVariable("no") String no) {
		mealDAO.delMeal(no);
	}
	
}

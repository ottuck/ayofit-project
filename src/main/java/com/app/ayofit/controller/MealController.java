package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.MealDTO;
import com.app.ayofit.model.NutritionDTO;
import com.app.ayofit.service.MealDAO;

@RestController
@RequestMapping("api/meal")
public class MealController {

	@Autowired
	private MealDAO mealDAO;

	@GetMapping("/type")
	public List<NutritionDTO> getMealByMealType(@RequestParam("userID") String userID, @RequestParam("date") String date) {
		return mealDAO.getAllMealTypesByDate(date, userID);
	}

	@GetMapping("")
	public List<MealDTO> getAllMeal() {
		return mealDAO.getAllMeal();
	}

	@PostMapping("")
	public void regMeal(@RequestBody List<MealDTO> mealList) {
		mealDAO.regMeal(mealList);
	}

	@DeleteMapping("")
	public void delMeal(@RequestParam("mealDate") String mealDate, @RequestParam("mealType") String mealType) {
		System.out.println("밀 타입 들어오나? : " + mealType);
		System.out.println("날자 들어오나? : " + mealDate);
		mealDAO.delMeal(mealDate, mealType);
	}

}

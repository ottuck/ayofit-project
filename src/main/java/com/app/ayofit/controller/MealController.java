package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping("/type/total")
	public List<NutritionDTO> getTotalNutritionForDay(
			@RequestParam("userID") String userID,
			@RequestParam("date") String date) {
		return mealDAO.getTotalNutritionForDay(date, userID);
	}

	@GetMapping("/type")
	public List<MealDTO> getMealByTypeAndDate(
			@RequestParam("mealType") String mealType,
			@RequestParam("date") String date) {
		//앱을 켜고 이 요청을 했을때 mealType이 안들어오는 문제가 있음, RecordScreen에 밀타입이 존재하지 않기 때문에 
		System.out.println("밀타입 :" + mealType);	
		System.out.println("날자 :" + date);
		return mealDAO.getMealByTypeAndDate(mealType, date);
	}

	@GetMapping("")
	public List<MealDTO> getAllMeal() {
		return mealDAO.getAllMeal();
	}

	@PostMapping("")
	public void regMeal(@RequestBody List<MealDTO> mealList, @RequestParam("userId") String userId) {
		System.out.println(userId);
		mealDAO.regMeal(mealList,userId);
	}

	@DeleteMapping("")
	public void delMeal(@RequestParam("mealDate") String mealDate, @RequestParam("mealType") String mealType) {
		mealDAO.delMeal(mealDate, mealType);
	}

}

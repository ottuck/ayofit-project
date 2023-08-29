package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FoodDTO;
import com.app.ayofit.service.FoodDAO;


@RestController
@RequestMapping("api/food")
public class FoodController {
	
	@Autowired
	private FoodDAO foodDAO;
	
	@GetMapping("")
	public List<FoodDTO> getAllFoodInfo() {
    	return foodDAO.getAllFoodInfo();
	}
	
	@GetMapping("/search/{foodName}")
	public List<FoodDTO> searchFood(@PathVariable String foodName) {
		return foodDAO.searchFoodByName(foodName);
	}
	
	@GetMapping("{n_no}")
    public FoodDTO getMethodName(@PathVariable("n_no") String n_no) {
			return foodDAO.getFoodInfoById(n_no);
    }
	
	
}

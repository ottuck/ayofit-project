package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FastDTO;
import com.app.ayofit.service.FastDAO;


@RestController
@RequestMapping("api/food")
public class FastController {
	
	@Autowired
	private FastDAO fastDAO;
	
	@GetMapping("")
	public List<FastDTO> getAllFoodInfo() {
	    	return fastDAO.getAllFoodInfo();
	}
	
	@GetMapping("{n_no}")
    public FastDTO getMethodName(@PathVariable("n_no") String n_no) {
		
			return fastDAO.getFoodInfoById(n_no);
    }
	
	 @GetMapping("/search/{n_food_name}")
	    public List<FastDTO> searchFood(@PathVariable String n_food_name) {
		 	return fastDAO.searchFoodByName(n_food_name);
	}
}

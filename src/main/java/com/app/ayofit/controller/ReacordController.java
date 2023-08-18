package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.RecordDTO;
import com.app.ayofit.service.RecordDAO;


@RestController
@RequestMapping("api/food")
public class ReacordController {
	
	@Autowired
	private RecordDAO foodDAO;
	
	@GetMapping("")
	public List<RecordDTO> getAllFoodInfo() {
	    	return foodDAO.getAllFoodInfo();
	}
	
	@GetMapping("{n_no}")
    public RecordDTO getMethodName(@PathVariable("n_no") String n_no) {
			return foodDAO.getFoodInfoById(n_no);
    }
	
	 @GetMapping("/search/{n_food_name}")
	    public List<RecordDTO> searchFood(@PathVariable String n_food_name) {
		 	return foodDAO.searchFoodByName(n_food_name);
	}
}
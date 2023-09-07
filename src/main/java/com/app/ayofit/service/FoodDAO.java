package com.app.ayofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.FoodMapper;
import com.app.ayofit.model.FoodDTO;

@Service
public class FoodDAO {
	
	@Autowired
	private FoodMapper foodMapper;
	
	public FoodDAO(FoodMapper foodMapper) {
        this.foodMapper = foodMapper;
    }
	
	public List<FoodDTO> getAllFoodInfo() {
        return foodMapper.getAllFoodInfo();
    }
	
	public List<FoodDTO> searchFoodByName(String foodName) {
		return foodMapper.searchFoodByName(foodName);
	}
	
    public FoodDTO getFoodInfoById(String n_no) {
        return foodMapper.getFoodInfoById(n_no);
    }
	
    
}

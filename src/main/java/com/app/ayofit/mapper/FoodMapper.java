package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.FoodDTO;

@Mapper
public interface FoodMapper {
	
	List<FoodDTO> getAllFoodInfo();
	FoodDTO getFoodInfoById(String n_no);
	List<FoodDTO> searchFoodByName(String n_food_name);
}

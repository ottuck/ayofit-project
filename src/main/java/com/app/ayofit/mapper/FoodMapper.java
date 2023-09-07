package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.FoodDTO;

@Mapper
public interface FoodMapper {
	
	List<FoodDTO> getAllFoodInfo();
	List<FoodDTO> searchFoodByName(String foodName);
	FoodDTO getFoodInfoById(String n_no);
}

package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.RecordDTO;

@Mapper
public interface FastMapper {
	
	List<RecordDTO> getAllFoodInfo();
	RecordDTO getFoodInfoById(String n_no);
	List<RecordDTO> searchFoodByName(String n_food_name);
}

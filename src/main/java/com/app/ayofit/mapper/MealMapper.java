package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.MealDTO;

@Mapper
public interface MealMapper {

	List<MealDTO> getAllMeal();
	List<MealDTO> getMealByDate();
	int regMeal(MealDTO meal);
	int delMeal(String mealDate, String mealType);
}

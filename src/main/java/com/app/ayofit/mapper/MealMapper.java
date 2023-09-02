package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.MealDTO;
import com.app.ayofit.model.NutritionDTO;

@Mapper
public interface MealMapper {

	List<MealDTO> getAllMeal();
	List<MealDTO> getMealByDate();
	List<NutritionDTO> getBreakfastByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getLunchByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getDinnerByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getSnackByDate(@Param("date") String date, @Param("userID") String userID);
	int regMeal(MealDTO meal);
	int delMeal(@Param("rMealType") String mealDate, @Param("rMealDate") String mealType);
}

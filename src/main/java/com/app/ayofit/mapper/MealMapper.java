package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.MealDTO;
import com.app.ayofit.model.NutritionDTO;

@Mapper
public interface MealMapper {

	List<MealDTO> getAllMeal();
	List<MealDTO> getMealByTypeAndDate(@Param("mealType") String mealType, @Param("date") String date);	
	List<NutritionDTO> getBreakfastTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getLunchTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getDinnerTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getSnackTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	int regMeal(MealDTO meal, String userId);
	int delMeal(@Param("mealDate") String mealDate, @Param("mealType") String mealType);
	
}

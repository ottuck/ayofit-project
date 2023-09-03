package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.MealDTO;
import com.app.ayofit.model.NutritionDTO;

@Mapper
public interface MealMapper {

	List<MealDTO> getAllMeal();
<<<<<<< HEAD
	List<MealDTO> getMealByDate();
	List<NutritionDTO> getBreakfastByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getLunchByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getDinnerByDate(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getSnackByDate(@Param("date") String date, @Param("userID") String userID);
	int regMeal(MealDTO meal, @Param("userId") String userId);
=======
	List<MealDTO> getMealByTypeAndDate(@Param("mealType") String mealType, @Param("date") String date);	
	List<NutritionDTO> getBreakfastTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getLunchTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getDinnerTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	List<NutritionDTO> getSnackTotalNutrition(@Param("date") String date, @Param("userID") String userID);
	int regMeal(MealDTO meal);
>>>>>>> ec56f333c986e30b3587a1e0ed3c5dbe50ca5e69
	int delMeal(@Param("mealDate") String mealDate, @Param("mealType") String mealType);
	
}

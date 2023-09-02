package com.app.ayofit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.MealMapper;
import com.app.ayofit.model.MealDTO;
import com.app.ayofit.model.NutritionDTO;

@Service
public class MealDAO {

	@Autowired
	private MealMapper mealMapper;

	public List<MealDTO> getAllMeal() {
		return mealMapper.getAllMeal();
	}

	public List<NutritionDTO> getAllMealTypesByDate(String date, String userID) {
		
	    List<NutritionDTO> mealTypeList = new ArrayList<>();
	    
	    List<NutritionDTO> breakfastList = mealMapper.getBreakfastByDate(date, userID);
	    List<NutritionDTO> launchList = mealMapper.getLunchByDate(date, userID);
	    List<NutritionDTO> dinnerList = mealMapper.getDinnerByDate(date, userID);
	    List<NutritionDTO> snackList = mealMapper.getSnackByDate(date, userID);
	    
	    mealTypeList.addAll(breakfastList);
	    mealTypeList.addAll(launchList);
	    mealTypeList.addAll(dinnerList);
	    mealTypeList.addAll(snackList);
	    
	    System.out.println(mealTypeList);
	    return mealTypeList;
	}
	


	public boolean regMeal(List<MealDTO> mealList) {
		int successCount = 0; // 성공한 삽입 연산의 개수를 추적
		for (MealDTO meal : mealList) {
			if (meal.getrCarbohydrate() == null) {
				meal.setrCarbohydrate("0");
			}
			if (meal.getrProtein() == null) {
				meal.setrProtein("0");
			}
			if (meal.getrFat() == null) {
				meal.setrFat("0");
			}
			System.out.println(meal);
			// 여기에서 DB에 삽입 (하나씩)
			if (mealMapper.regMeal(meal) == 1) {
				successCount++;
			}
		}
		// 모든 삽입이 성공했다면 true를 반환
		return successCount == mealList.size();
	}

	public boolean delMeal(String mealDate, String mealType) {
		System.out.println("밀 타입 들어오나? : " + mealType);
		System.out.println("날자 들어오나? : " + mealDate);
		 return mealMapper.delMeal(mealDate, mealType) == 1;
	}

}

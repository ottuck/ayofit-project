package com.app.ayofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.MealMapper;
import com.app.ayofit.model.MealDTO;

@Service
public class MealDAO {
	
	@Autowired
	private MealMapper mealMapper;
	
	public MealDAO(MealMapper mealMapper) {
		this.mealMapper = mealMapper;
	}
	
	public List<MealDTO> getAllMeal() {
		return mealMapper.getAllMeal();
	}
	
	public boolean regMeal(MealDTO mealDTO) {
		if(mealMapper.regMeal(mealDTO) == 1) {
			return true;
		}else {
			return false;
		}
		
	}

	public boolean delMeal(String no) {
		if(mealMapper.delMeal(no) == 1) {
			return true;
		}else {
			return false;
		}
	} 
	
	
}

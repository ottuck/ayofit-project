package com.app.ayofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.NutritionMapper;
import com.app.ayofit.model.NutritionDTO;

@Service
public class NutritionDAO {

    @Autowired
    private NutritionMapper nutritionMapper;

    public List<NutritionDTO> getDailyNutrition(String userId, String date) {
        return nutritionMapper.getDailyNutrition(userId, date);
    }

    public List<NutritionDTO> getWeeklyNutrition(String userId, String startDate, String endDate) {
        return nutritionMapper.getWeeklyNutrition(userId, startDate, endDate);
    }

    public List<NutritionDTO> getMonthlyNutrition(String userId, String startDate, String endDate) {
        return nutritionMapper.getMonthlyNutrition(userId, startDate, endDate);
    }

}

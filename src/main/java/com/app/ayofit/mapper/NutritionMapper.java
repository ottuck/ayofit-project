package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.NutritionDTO;

@Mapper
public interface NutritionMapper {
	List<NutritionDTO> getDailyNutrition(@Param("userId") String userId, @Param("date") String date);
	List<NutritionDTO> getWeeklyNutrition(@Param("userId") String userId, @Param("startDate") String startDate, @Param("endDate") String endDate);
	List<NutritionDTO> getMonthlyNutrition(@Param("userId")String userId, @Param("startDate")String startDate, @Param("endDate")String endDate);

}


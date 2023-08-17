package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.NutritionInfo;

@Mapper
public interface NutritionMapper {
	List<NutritionInfo> getDailyNutrition(@Param("userId") String userId, @Param("date") String date);
	List<NutritionInfo> getWeeklyNutrition(@Param("userId") String userId, @Param("startDate") String startDate, @Param("endDate") String endDate);
    List<NutritionInfo> getMonthlyNutrition(@Param("userId")String userId, @Param("month")String month);
}


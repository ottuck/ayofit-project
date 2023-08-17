package com.app.ayofit.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.NutritionMapper;
import com.app.ayofit.model.NutritionInfo;

@Service
public class NutritionService {

    @Autowired
    private NutritionMapper nutritionMapper;
    
    public List<NutritionInfo> getDailyNutrition(String userId, String date) {
        return nutritionMapper.getDailyNutrition(userId, date);
    }
    
    public List<NutritionInfo> getWeeklyNutrition(String userId, String startDate, String endDate) {
        return nutritionMapper.getWeeklyNutrition(userId, startDate, endDate);
    }
    
//    public List<NutritionInfo> getWeeklyNutrition(String userId) {
//    	 // 현재 날짜 생성
//        Date currentDate = new Date();
//        // Calendar 인스턴스 생성
//        Calendar calendar = Calendar.getInstance();
//        // 현재 날짜 설정
//        calendar.setTime(currentDate);
//        // 일주일 전 날짜 계산
//        calendar.add(Calendar.WEEK_OF_YEAR, -1);
//        calendar.add(Calendar.DAY_OF_YEAR, 1);
//        // 일주일 전 날짜를 Date 형태로 가져오기
//        Date oneWeekAgo = calendar.getTime();
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        String endDate = sdf.format(oneWeekAgo);
//        System.out.println(endDate);
//    	return nutritionMapper.getWeeklyNutrition(userId, endDate);
//    }

    public List<NutritionInfo> getMonthlyNutrition(String userId, String month) {
        return nutritionMapper.getMonthlyNutrition(userId, month);
    }
}


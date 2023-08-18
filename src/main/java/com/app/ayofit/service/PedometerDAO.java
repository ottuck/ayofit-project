package com.app.ayofit.service;


import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.PedometerMapper;
import com.app.ayofit.model.PedometerDTO;


@Service
public class PedometerDAO {
	
	  @Autowired
	    private PedometerMapper pedometerMapper;

	    public List<PedometerDTO> getAllPedometerData() {
	    	List<PedometerDTO> pd = pedometerMapper.getAllPedometerData();
	    	System.out.println(pd);
	        return pedometerMapper.getAllPedometerData();
	    }

	    public PedometerDTO addPedometerData(PedometerDTO pedometerDTO) {
	        pedometerMapper.addPedometerData(pedometerDTO);
	        return pedometerDTO; 
	    }
	    
	    public List<PedometerDTO> getWeeklyAchievement() {
	        // 현재 날짜를 얻습니다.
	        Calendar calendar = Calendar.getInstance();
	        Date currentDate = calendar.getTime();

	        // 일주일 전의 날짜를 얻습니다.
	        calendar.add(Calendar.DAY_OF_MONTH, -7);
	        Date weekAgoDate = calendar.getTime();

	        // 해당 기간 내의 달성 기록을 조회합니다.
	        List<PedometerDTO> weeklyAchievements = pedometerMapper.getAchievementsBetweenDates(weekAgoDate, currentDate);

	        return weeklyAchievements;
	    }
}

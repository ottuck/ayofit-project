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
	    
//	 public List<PedometerDTO> getWeeklyPedometerData() {
//	        // Calculate the start and end dates of the current week
//	        Calendar cal = Calendar.getInstance();
//	        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
//	        Date startOfWeek = cal.getTime();
//	        cal.add(Calendar.DATE, 6);
//	        Date endOfWeek = cal.getTime();
//	        
//	        return pedometerMapper.getWeeklyPedometerData(startOfWeek, endOfWeek);
//	    }
	 public List<PedometerDTO> getWeeklyPedometerData(Date startOfWeek, Date endOfWeek) {
	        return pedometerMapper.getWeeklyPedometerData(startOfWeek, endOfWeek);
	    }
    
}

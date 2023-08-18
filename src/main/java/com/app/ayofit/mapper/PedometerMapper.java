package com.app.ayofit.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.PedometerDTO;

@Mapper
public interface PedometerMapper {
	
    void addPedometerData(PedometerDTO pedometerDTO);

    List<PedometerDTO> getAllPedometerData();
    
    List<PedometerDTO> getAchievementsBetweenDates(Date startDate, Date endDate);

}

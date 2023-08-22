package com.app.ayofit.mapper;



import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.PedometerDTO;

@Mapper
public interface PedometerMapper {
	 List<PedometerDTO> getWeeklyAchievement(
		        @Param("userId") String userId,
		        @Param("startDate") LocalDate startDate,
		        @Param("endDate") LocalDate endDate
		    );
	
}

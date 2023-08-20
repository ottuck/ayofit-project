package com.app.ayofit.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.PedometerDTO;

@Mapper
public interface PedometerMapper {
	
	 List<PedometerDTO> getWeeklyPedometerData(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);
}

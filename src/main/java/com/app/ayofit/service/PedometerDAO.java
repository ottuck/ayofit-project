package com.app.ayofit.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
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

	public void addGoal(PedometerDTO pedometerDTO) {
		Date currentDate = new Date();
		pedometerDTO.setpDate(currentDate);
		pedometerMapper.insertGoal(pedometerDTO);
	}

	public List<PedometerDTO> getWeeklyAchievement(String userId, LocalDate date) {
		LocalDate monday = date.with(DayOfWeek.MONDAY);
		LocalDate sunday = date.with(DayOfWeek.SUNDAY);

		List<PedometerDTO> weeklyAchievement = pedometerMapper.getWeeklyAchievement(userId, monday, sunday);

		return weeklyAchievement;
	}

	public void updateStepGoal(PedometerDTO pedometerDTO) {
		pedometerMapper.updateStepGoal(pedometerDTO);
	}

	public void updateDailyStep(PedometerDTO pedometerDTO) {
		Date currentDate = new Date();
		pedometerDTO.setpDate(currentDate);

		pedometerMapper.updateDailyStep(pedometerDTO);
	}

}

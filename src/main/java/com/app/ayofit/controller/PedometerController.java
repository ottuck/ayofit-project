package com.app.ayofit.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.PedometerDTO;
import com.app.ayofit.service.PedometerDAO;

@RestController
@RequestMapping("/api/pedometer")
public class PedometerController {
	 @Autowired
	    private PedometerDAO pedometerDAO;

	 @GetMapping("/weekly-achievement")
	    public ResponseEntity<List<PedometerDTO>> getWeeklyAchievement(
	            @RequestParam String userId,
	            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
	        
	        List<PedometerDTO> weeklyAchievement = pedometerDAO.getWeeklyAchievement(userId, date);
	        return new ResponseEntity<>(weeklyAchievement, HttpStatus.OK);
	    }
	 
	 @PutMapping("/update-step-goal")
	 public ResponseEntity<String> updateStepGoal(@RequestBody PedometerDTO pedometerDTO) {
	     // pNo를 사용하여 해당 레코드를 찾아서 업데이트 로직 수행
	     pedometerDAO.updateStepGoal(pedometerDTO);
	     
	     return ResponseEntity.ok("Step goal updated successfully");
	 }
	    
}

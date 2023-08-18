package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.PedometerDTO;
import com.app.ayofit.service.PedometerDAO;

@RestController
@RequestMapping("/api/pedometer")
public class PedometerController {
	
	  @Autowired
	  private PedometerDAO pedometerDAO;
	
	  @GetMapping("/test")
	  public List<PedometerDTO> getAllPedometerData() {
		  System.out.println(pedometerDAO.getAllPedometerData());
	    return pedometerDAO.getAllPedometerData();
	  }
	  
	  @PostMapping("/dailyrecord")
	  public PedometerDTO addPedometerData(@RequestBody PedometerDTO pedometerDTO) {
	    return pedometerDAO.addPedometerData(pedometerDTO);
	  }
	  
	  @GetMapping("/weeklyachievements")
	    public ResponseEntity<List<PedometerDTO>> getWeeklyAchievements() {
	        List<PedometerDTO> weeklyAchievements = pedometerDAO.getWeeklyAchievement();
	        return ResponseEntity.ok(weeklyAchievements);
	    }


}

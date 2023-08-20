package com.app.ayofit.controller;


import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.PedometerDTO;
import com.app.ayofit.service.PedometerDAO;

@RestController
@RequestMapping("/api/pedometer")
public class PedometerController {
	
	  @Autowired
	  private PedometerDAO pedometerDAO;
	
	  @GetMapping("/week_data")
	  public ResponseEntity<List<PedometerDTO>> getWeeklyPedometerData() {
	      Calendar calendar = Calendar.getInstance();
	      
	      // Find the first day of the current week (Sunday) and go back to Monday
	      calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
	      calendar.add(Calendar.DATE, -6);
	      Date startOfWeek = calendar.getTime();

	      // Set the end of the week as today
	      Date endOfWeek = new Date(); // Current date and time

	      List<PedometerDTO> weekData = pedometerDAO.getWeeklyPedometerData(startOfWeek, endOfWeek);
	      return ResponseEntity.ok(weekData);
	  }
	    
}

package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FastDTO;
import com.app.ayofit.service.FastDAO;


@RestController
@RequestMapping("api/fast")
public class FastController {
	
	@Autowired
	private FastDAO fastDAO;
	
    @PostMapping("")
    public void receiveDataFromApp(@RequestBody FastDTO dataFromApp) {
    	System.out.println(dataFromApp);
        // dataFromApp 객체를 이용하여 받은 데이터 처리
		/*
		 * String confirmStartTime = dataFromApp.getConfirmStartTime(); String
		 * confirmEndTime = dataFromApp.getConfirmEndTime(); String timerMethod =
		 * dataFromApp.getTimerMethod();
		 * 
		 * dataFromApp.setConfirmEndTime(confirmEndTime);
		 * dataFromApp.setConfirmStartTime(confirmStartTime);
		 * dataFromApp.setTimerMethod(timerMethod);
		 */
        
        // 이후 필요한 로직 수행 
        fastDAO.insertFastData(dataFromApp);
    }
}

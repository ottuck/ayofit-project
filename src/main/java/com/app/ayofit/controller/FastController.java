package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.FastDTO;
import com.app.ayofit.service.FastDAO;

@RestController
@RequestMapping("api/fast")
public class FastController {

	@Autowired
	private FastDAO fastDAO;

	@PostMapping("")
	public void receiveDataFromApp(@RequestBody FastDTO dataFromApp, @RequestParam String userId) {
		System.out.println(dataFromApp);
		// dataFromApp 객체를 이용하여 받은 데이터 처리

		String confirmStartTime = dataFromApp.getConfirmStartTime();
		String confirmEndTime = dataFromApp.getConfirmEndTime();
		int elapsedTime = dataFromApp.getElapsedTime();

		dataFromApp.setConfirmEndTime(confirmEndTime);
		dataFromApp.setConfirmStartTime(confirmStartTime);
		dataFromApp.setElapsedTime(elapsedTime);

		fastDAO.insertFastData(dataFromApp, userId);
	}

	@GetMapping("")
	public List<FastDTO> getAllFastRecord() {
		return fastDAO.getAllFastRecord();
	}

}

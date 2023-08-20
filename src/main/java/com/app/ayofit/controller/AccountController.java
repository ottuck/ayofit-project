package com.app.ayofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.GoalDTO;
import com.app.ayofit.service.AccountDAO;

@RestController
@RequestMapping("/api/account")
public class AccountController {
	
	@Autowired
	private AccountDAO aDAO;
	
	@PostMapping("/{userId}")
	public void regAccountInfos(@PathVariable String userId, @RequestBody AccountDTO aDTO) {
		aDAO.regAccountInfos(userId, aDTO);
	}
	
	@PostMapping("/{userId}/goal")
	public void regAccountGoal(@PathVariable String userId, @RequestBody GoalDTO gDTO) {
		System.out.println(gDTO);
		aDAO.regAccountGoal(userId, gDTO);
	}
	
}

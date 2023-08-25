package com.app.ayofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
		aDAO.regAccountGoal(userId, gDTO);
	}
	
	@PostMapping("/{userId}/weight")
	public void regAccountWeight(@PathVariable String userId, @RequestBody AccountDTO aDTO) {
		aDAO.regAccountWeight(userId,aDTO);
	}	
	
	@GetMapping("/{userId}/goal")
	public GoalDTO getAccountGoals(@PathVariable String userId) {
		System.out.println(userId);
		return aDAO.getAccountGoals(userId);
	}
	
	@GetMapping("/{userId}")
	public AccountDTO getAccountInfos(@PathVariable String userId) {
		return aDAO.getAccountInfos(userId);
	}
	
	@GetMapping("/{userId}/weight")
	public double getAccountTarWeight(@PathVariable String userId) {
		return aDAO.getAccountTarWeight(userId);
	}

	@PutMapping("/{userId}")
	public boolean updateAccountInfos(@PathVariable String userId,  @RequestBody AccountDTO aDTO) {
		return aDAO.updateAccountInfos(userId,aDTO);
	}
	
	@PutMapping("/{userId}/goal")
	public boolean updateAccountGoal(@PathVariable String userId, @RequestBody GoalDTO gDTO) {
		return	aDAO.updateAccountGoal(userId, gDTO);
	}
	
	
	
}

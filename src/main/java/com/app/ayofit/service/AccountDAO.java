package com.app.ayofit.service;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.AccountMapper;
import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.GoalDTO;

@Service
public class AccountDAO {

	private AccountMapper aMapper;

	public AccountDAO(AccountMapper aMapper) {
		this.aMapper = aMapper;
	}

	public boolean regAccountInfos(String userId, AccountDTO aDTO) {
		if (aMapper.regAccountInfos(userId, aDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public boolean regAccountGoal(String userId, GoalDTO gDTO) {
		if (aMapper.regAccountGoal(userId, gDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public boolean regAccountWeight(String userId, AccountDTO aDTO) {
		if (aMapper.regAccountWeight(userId, aDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public GoalDTO getAccountGoals(String userId) {
		return aMapper.getAccountGoals(userId);
	}

	public AccountDTO getAccountInfos(String userId) {
		return aMapper.getAccountInfos(userId);
	}

	public double getAccountTarWeight(String userId) {
		return aMapper.getAccountTarWeight(userId);
	}

	public boolean updateAccountInfos(String userId, AccountDTO aDTO) {
		if (aMapper.updateAccountInfos(userId, aDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public boolean updateAccountGoal(String userId, GoalDTO gDTO) {
		if (aMapper.updateAccountGoal(userId, gDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

}

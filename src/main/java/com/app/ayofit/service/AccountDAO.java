package com.app.ayofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.AccountMapper;
import com.app.ayofit.model.AccountDTO;

@Service
public class AccountDAO {
	
	@Autowired
	private AccountMapper aMapper;

	public boolean regAccountInfos(String userId, AccountDTO aDTO) {
		if (aMapper.regAccountInfos(userId, aDTO) == 1) {
			return true;
		}else {
			return false;
		}
	}
	
	
	
}

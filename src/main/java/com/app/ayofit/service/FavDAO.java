package com.app.ayofit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.FavMapper;
import com.app.ayofit.model.FavDTO;

@Service
public class FavDAO {

	private FavMapper fMapper;
	
	public FavDAO(FavMapper fMapper) {
		this.fMapper = fMapper;
	}

	public List<FavDTO> getFavorites(String userId, List<Integer> nNos) {
		
		return fMapper.getFavoirtes(userId);
	}

	public void regFavorites(List<Integer> nNos, String userId) {
		
		for (Integer no : nNos) {
			if (fMapper.regFavorites(no, userId) == 1) {
				System.out.println("db 등록 성공!");
			}
			
		}
		
	}

}

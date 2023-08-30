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

	public List<FavDTO> getFavorites(String userId) {
		
		return fMapper.getFavoirtes(userId);
	}

}

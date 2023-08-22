package com.app.ayofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.FastMapper;
import com.app.ayofit.model.FastDTO;


@Service
public class FastDAO {
	
	
	@Autowired
	private FastMapper fastMapper;
	
	public List<FastDTO> getAllFoodInfo() {
        return fastMapper.getAllFoodInfo();
    }

    public FastDTO getFoodInfoById(String n_no) {
        return fastMapper.getFoodInfoById(n_no);
    }
	
    public List<FastDTO> searchFoodByName(String n_food_name) {
        return fastMapper.searchFoodByName(n_food_name);
    }
    
}

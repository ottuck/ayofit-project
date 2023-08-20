package com.app.ayofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.RecordMapper;
import com.app.ayofit.model.RecordDTO;

@Service
public class RecordDAO {
	
	
	@Autowired
	private RecordMapper foodMapper;
	
	public RecordDAO(RecordMapper foodMapper) {
        this.foodMapper = foodMapper;
    }
	
	public List<RecordDTO> getAllFoodInfo() {
        return foodMapper.getAllFoodInfo();
    }

    public RecordDTO getFoodInfoById(String n_no) {
        return foodMapper.getFoodInfoById(n_no);
    }
	
    public List<RecordDTO> searchFoodByName(String n_food_name) {
        return foodMapper.searchFoodByName(n_food_name);
    }
    
}

package com.app.ayofit.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.RecordWeightMapper;
import com.app.ayofit.model.RecordWeightDTO;

@Service
public class RecordWeightDAO {

    @Autowired
    private RecordWeightMapper mapper;

    public List<RecordWeightDTO> getAllWeights() {
        return mapper.findAll();
    }

    public RecordWeightDTO getWeightByDateAndId(Date rWeightDate, String rId) {
        return mapper.findByDateAndId(rWeightDate, rId);
    }

    public void addWeight(RecordWeightDTO record) {
        mapper.insert(record);
    }

    public void updateWeight(RecordWeightDTO record) {
        mapper.update(record);
    }

    public void delete(String rId, Date rWeightDate) {
        mapper.delete(rId, rWeightDate);
    }
    
}


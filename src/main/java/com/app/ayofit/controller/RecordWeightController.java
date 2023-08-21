package com.app.ayofit.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.RecordWeightDTO;
import com.app.ayofit.service.RecordWeightDAO;

@RestController
@RequestMapping("/api/weights")
public class RecordWeightController {

    @Autowired
    private RecordWeightDAO recordWeightDao; 

    @GetMapping
    public List<RecordWeightDTO> getAllWeights() {
        return recordWeightDao.getAllWeights();
    }
    
    @GetMapping("/{rId}/{rWeightDate}")
    public RecordWeightDTO getWeightByDateAndId(@PathVariable String rId, @PathVariable String rWeightDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 날짜 형식에 맞게 조정해야 합니다.
        Date date;
        try {
            date = sdf.parse(rWeightDate);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid Date Format");
        }
        return recordWeightDao.getWeightByDateAndId(date, rId);
    }

    @PostMapping
    public void addWeight(@RequestBody RecordWeightDTO record) {
    	recordWeightDao.addWeight(record);
    }
    
    @PutMapping("/update")
    public void updateWeight(@RequestBody RecordWeightDTO record) {
        recordWeightDao.updateWeight(record);
    }

    @DeleteMapping("/delete/{rId}")
    public void deleteLatestWeight(@PathVariable String rId) {
        recordWeightDao.deleteLatestWeight(rId);
    }
    
}


package com.app.ayofit.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.RecordWeightMapper;
import com.app.ayofit.model.RecordWeightDTO;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.time.ZoneId;


@Service
public class RecordWeightDAO {

    @Autowired
    private RecordWeightMapper mapper;

    public List<RecordWeightDTO> getWeightsByUserId(String rId) {
        return mapper.findAllByUserId(rId);
    }

    public RecordWeightDTO getWeightByDateAndId(Date rWeightDate, String rId) {
        return mapper.findByDateAndId(rWeightDate, rId);
    }
    
    public List<Map<String, Object>> getWeeklyAveragesForUser(String rId) {
    	List<RecordWeightDTO> weights = mapper.findAllWeightsByUserId(rId);
    	
        LocalDate today = LocalDate.now();
        LocalDate weekEnd = today; // 주의 끝: 오늘
        LocalDate weekStart = today.minusDays(6); // 주의 시작: 오늘로부터 6일 전

        List<Map<String, Object>> weekAverages = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            double weeklySum = 0;
            int count = 0;

            for (RecordWeightDTO weight : weights) {
                Date date = weight.getrWeightDate();
                LocalDate weightDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                
                if ((weightDate.isEqual(weekStart) || weightDate.isAfter(weekStart))
                        && (weightDate.isEqual(weekEnd) || weightDate.isBefore(weekEnd))) {
                    weeklySum += weight.getrWeight();
                    count++;
                }
            }

            if (count > 0) {
                double average = Math.round((weeklySum / count) * 10) / 10.0;
                Map<String, Object> weekAvg = new HashMap<>();
                weekAvg.put("average", average);
                weekAvg.put("dateRange", Map.of("start", weekStart.toString(), "end", weekEnd.toString()));
                weekAverages.add(weekAvg);
            }

            // 다음 주의 범위 계산
            weekEnd = weekStart.minusDays(1);
            weekStart = weekEnd.minusDays(6);
        }

        return weekAverages;
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


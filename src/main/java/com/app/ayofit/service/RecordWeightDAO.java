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
import java.util.stream.Collectors;
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
    
    public List<Map<String, Object>> getDailyForUser(String rId, String formattedToday) {
        List<RecordWeightDTO> weights = mapper.findAllByUserId(rId);

        LocalDate endDate = LocalDate.parse(formattedToday); // 사용자가 선택한 날짜
        LocalDate startDate = endDate.minusDays(6); // 6일 전

        List<Map<String, Object>> dailyData = new ArrayList<>();

        for (LocalDate date = endDate; !date.isBefore(startDate); date = date.minusDays(1)) {
            double dailySum = 0;
            int count = 0;

            for (RecordWeightDTO weight: weights) {
                Date weightDate = weight.getrWeightDate();
                LocalDate recordDate = weightDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                if (recordDate.isEqual(date)) {
                    dailySum += weight.getrWeight();
                    count++;
                }
                
            }

            double value;
            if (count > 0) {
                value = Math.round(dailySum / count * 10) / 10.0;
            } else {
                value = 0; // 해당 날짜의 데이터가 없으면 0으로 설정
            }

            Map<String, Object> dailyRecord = new HashMap<>();
            dailyRecord.put("date", date.toString());
            dailyRecord.put("weight", value);
            dailyData.add(dailyRecord);
        }

        return dailyData;
    }

    
    public List<Map<String, Object>> getWeeklyAveragesForUser(String rId, String formattedToday) {
        List<RecordWeightDTO> weights = mapper.findAllWeightsByUserId(rId);
        
        LocalDate weekEnd = LocalDate.parse(formattedToday); // 주의 끝: 입력된 날짜
        LocalDate weekStart = weekEnd.minusDays(6); // 주의 시작: 입력된 날짜로부터 6일 전

        List<Map<String, Object>> weekAverages = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            double weeklySum = 0;
            int count = 0;

            for (RecordWeightDTO weight: weights) {
                Date date = weight.getrWeightDate();
                LocalDate weightDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                
                if ((weightDate.isEqual(weekStart) || weightDate.isAfter(weekStart))
                        && (weightDate.isEqual(weekEnd) || weightDate.isBefore(weekEnd))) {
                    weeklySum += weight.getrWeight();
                    count++;
                }
            }

            double average;
            if (count > 0) {
                average = Math.round((weeklySum / count) * 10) / 10.0;
            } else {
                average = 0; // 데이터가 없거나 부족한 경우 0으로 설정
            }
            Map<String, Object> weekAvg = new HashMap<>();
            weekAvg.put("average", average);
            weekAvg.put("dateRange", Map.of("start", weekStart.toString(), "end", weekEnd.toString()));
            weekAverages.add(weekAvg);

            // 다음 주의 범위 계산
            weekEnd = weekStart.minusDays(1);
            weekStart = weekEnd.minusDays(6);
        }
        System.out.println(weekAverages);
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


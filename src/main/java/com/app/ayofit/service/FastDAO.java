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
    
    public void insertFastData(FastDTO fastDTO) {
        fastMapper.insertFastData(fastDTO); // FastMapper를 이용하여 데이터베이스에 데이터 삽입
    }
    
    // 기타 다른 메소드들도 추가 가능
}

    

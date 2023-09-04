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

    public void insertFastData(FastDTO fastDTO,String userId) {
        fastMapper.insertFastData(fastDTO, userId);
    }

    public List<FastDTO> getAllFastRecord() {
        return fastMapper.getAllFastRecord();
    }

}

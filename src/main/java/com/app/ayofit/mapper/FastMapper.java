package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.FastDTO;


@Mapper
public interface FastMapper {
    void insertFastData(FastDTO fastDTO);
    
}

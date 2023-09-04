package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.FastDTO;

import lombok.experimental.PackagePrivate;


@Mapper
public interface FastMapper {
    void insertFastData(@Param("fDTO") FastDTO fastDTO, @Param("userId") String userId);
    List<FastDTO> getAllFastRecord();
}

package com.app.ayofit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.FileDTO;

@Mapper
public interface FileMapper {

	int uploadImg(@Param("fDTO") FileDTO fDTO);

}

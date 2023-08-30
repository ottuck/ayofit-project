package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.FavDTO;

@Mapper
public interface FavMapper {

	List<FavDTO> getFavoirtes(String userId);

}

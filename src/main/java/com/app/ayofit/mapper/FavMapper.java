package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.FavDTO;

@Mapper
public interface FavMapper {

	List<FavDTO> getFavoirtes(String userId);

	int regFavorites(@Param("no") Integer no, @Param("userId") String userId);

	int deleteFavorites(int no);

}

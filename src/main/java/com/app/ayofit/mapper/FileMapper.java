package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.FileDTO;

@Mapper
public interface FileMapper {

	int uploadImg(@Param("fDTO") FileDTO fDTO);

	List<FileDTO> getImg(String userId);

	int saveFile(@Param("uuid") String uuid, @Param("userId")String userId, @Param("mealType") String mealType);

	void deleteFile(@Param("fNo")int fNo);

}

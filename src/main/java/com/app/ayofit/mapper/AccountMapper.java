package com.app.ayofit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.AccountDTO;

@Mapper
public interface AccountMapper {

	int regAccountInfos(@Param("userId")String userId, AccountDTO aDTO);

}

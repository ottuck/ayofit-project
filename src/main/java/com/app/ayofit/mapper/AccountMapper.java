package com.app.ayofit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.GoalDTO;

@Mapper
public interface AccountMapper {

	int regAccountInfos(@Param("userId")String userId, @Param("aDTO")AccountDTO aDTO);

	int regAccountGoal(@Param("userId")String userId, @Param("gDTO")GoalDTO gDTO);

	int regAccountWeight(@Param("userId")String userId, @Param("aDTO")AccountDTO aDTO);

}

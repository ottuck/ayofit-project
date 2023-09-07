package com.app.ayofit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.GoalDTO;

@Mapper
public interface AccountMapper {

	int regAccountInfos(@Param("userId") String userId, @Param("aDTO") AccountDTO aDTO);

	int regAccountGoal(@Param("userId") String userId, @Param("gDTO") GoalDTO gDTO);

	int regAccountWeight(@Param("userId") String userId, @Param("aDTO") AccountDTO aDTO);

	GoalDTO getAccountGoals(String userId);

	AccountDTO getAccountInfos(String userId);

	double getAccountTarWeight(String userId);

	int updateAccountInfos(@Param("userId") String userId, @Param("aDTO") AccountDTO aDTO);

	int updateAccountGoal(@Param("userId") String userId, @Param("gDTO") GoalDTO gDTO);

	int confirmInfo(@Param("userId") String userId);

}

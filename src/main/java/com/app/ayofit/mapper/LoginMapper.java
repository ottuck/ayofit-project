package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.AccountDTO;

@Mapper
public interface LoginMapper {

    List<AccountDTO> checkLogin(
            @Param("reqEmail") String reqEmail,
            @Param("reqPassword") String reqPassword);

}

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

        int setUser(
                        @Param("uuid") String uuid,
                        @Param("reqName") String reqName,
                        @Param("reqEmail") String reqEmail,
                        @Param("reqPassword") String reqPassword);

        List<AccountDTO> checkGoogle(@Param("reqId") String reqId);

        int setGoogle(
                        @Param("uuid") String uuid,
                        @Param("reqId") String reqId,
                        @Param("reqEmail") String reqEmail,
                        @Param("reqName") String reqName,
                        @Param("reqPicture") String reqPicture);

}

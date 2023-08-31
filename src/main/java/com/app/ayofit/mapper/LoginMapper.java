package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.AccountDTO;

@Mapper
public interface LoginMapper {

        AccountDTO checkLogin(
                        @Param("reqEmail") String reqEmail,
                        @Param("reqPassword") String reqPassword);

        int setEmptyInfo(@Param("infoUuid") String infoUuid);

        int setUser(
                        @Param("idUuid") String uuid,
                        @Param("reqName") String reqName,
                        @Param("reqEmail") String reqEmail,
                        @Param("reqPassword") String reqPassword,
                        @Param("infoUuid") String infoUuid);

        AccountDTO checkGoogle(@Param("reqId") String reqId);

        int setGoogle(
                        @Param("idUuid") String uuid,
                        @Param("reqId") String reqId,
                        @Param("reqEmail") String reqEmail,
                        @Param("reqName") String reqName,
                        @Param("reqPicture") String reqPicture,
                        @Param("infoUuid") String infoUuid);

}

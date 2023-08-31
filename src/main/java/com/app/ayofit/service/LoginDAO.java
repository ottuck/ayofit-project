package com.app.ayofit.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.LoginMapper;
import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.LoginDTO;

@Service
public class LoginDAO {

    private LoginMapper loginMapper;

    public LoginDAO(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    public LoginDTO checkLogin(Map<String, Object> requestData) {
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");
        AccountDTO user = loginMapper.checkLogin(reqEmail, reqPassword);

        if (user != null) {
            if (user.getA_type() == 0) {
                return new LoginDTO("SETINFO", "Sign in successful", user);
            }
            return new LoginDTO("SUCCESS", "Sign in successful", user);
        } else {
            return new LoginDTO("FAILED", "Email or password is incorrect", null);
        }
    }

    public LoginDTO setUser(Map<String, Object> requestData) {
        String[] uuid = UUID.randomUUID().toString().split("-");
        String idUuid = uuid[0];
        String infoUuid = uuid[1];
        String reqName = (String) requestData.get("name");
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");

        if (loginMapper.setEmptyInfo(infoUuid) == 1
                && loginMapper.setUser(idUuid, reqName, reqEmail, reqPassword, infoUuid) == 1) {
            return new LoginDTO("SUCCESS", "Sign up successful",
                    new AccountDTO(idUuid, reqEmail, reqPassword, reqName, infoUuid));
        } else {
            return new LoginDTO("FAILED", "Sign up failed", null);
        }
    }

    public LoginDTO checkGoogle(Map<String, Object> requestData) {
        String[] uuid = UUID.randomUUID().toString().split("-");
        String idUuid = uuid[0];
        String infoUuid = uuid[1];
        String reqId = (String) requestData.get("id");
        String reqEmail = (String) requestData.get("email");
        String reqName = (String) requestData.get("name");
        String reqPicture = (String) requestData.get("picture");
        AccountDTO user = loginMapper.checkGoogle(reqId);

        if (user != null) {
            if (user.getA_type() == 0) {
                return new LoginDTO("SETINFO", "Sign in successful", user);
            }
            return new LoginDTO("SUCCESS", "Sign in successful", user);
        } else {
            if (loginMapper.setEmptyInfo(infoUuid) == 1
                    && loginMapper.setGoogle(idUuid, reqId, reqEmail, reqName, reqPicture, infoUuid) == 1) {
                return new LoginDTO("SUCCESS", "Sign in successful", loginMapper.checkGoogle(reqId));
            } else {
                return new LoginDTO("FAILED", "Google login canceled", null);
            }
        }
    }

}

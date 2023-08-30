package com.app.ayofit.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.LoginMapper;
import com.app.ayofit.model.LoginDTO;
import com.app.ayofit.model.LoginInfoDTO;

@Service
public class LoginDAO {

    private LoginMapper loginMapper;

    public LoginDAO(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    public LoginDTO checkLogin(Map<String, Object> requestData) {
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");
        List<LoginInfoDTO> user = loginMapper.checkLogin(reqEmail, reqPassword);

        if (user.size() != 0) {
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

        if (loginMapper.setUser(idUuid, reqName, reqEmail, reqPassword, infoUuid) == 1) {
            return new LoginDTO("SUCCESS", "Sign up successful", null);
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
        List<LoginInfoDTO> user = loginMapper.checkGoogle(reqId);

        if (user.size() != 0) {
            return new LoginDTO("SUCCESS", "Sign in successful", user);
        } else {
            if (loginMapper.setGoogle(idUuid, reqId, reqEmail, reqName, reqPicture, infoUuid) != 1) {
                return new LoginDTO("FAILED", "Google login canceled", null);
            } else {
                return new LoginDTO("SUCCESS", "Sign in successful", loginMapper.checkGoogle(reqId));
            }
        }
    }

}

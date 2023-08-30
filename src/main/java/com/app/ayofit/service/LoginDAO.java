package com.app.ayofit.service;

import java.util.List;
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
        List<AccountDTO> user = loginMapper.checkLogin(reqEmail, reqPassword);

        if (user.size() != 0) {
            return new LoginDTO("SUCCESS", "Sign in successful", user);
        } else {
            return new LoginDTO("FAILED", "Email or password is incorrect", null);
        }
    }

    public LoginDTO setUser(Map<String, Object> requestData) {
        String uuid = UUID.randomUUID().toString().split("-")[0];
        String reqName = (String) requestData.get("name");
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");
        if (loginMapper.setUser(uuid, reqName, reqEmail, reqPassword) == 1) {
            return new LoginDTO("SUCCESS", "Sign up successful", null);
        } else {
            return new LoginDTO("FAILED", "Sign up failed", null);
        }
    }

}

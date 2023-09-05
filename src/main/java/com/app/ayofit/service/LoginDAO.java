package com.app.ayofit.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.LoginMapper;
import com.app.ayofit.model.LoginDTO;
import com.app.ayofit.model.LoginModel;

@Service
public class LoginDAO {

    private LoginMapper loginMapper;

    public LoginDAO(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    public LoginModel checkLogin(Map<String, Object> requestData) {
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");
        LoginDTO user = loginMapper.checkLogin(reqEmail, reqPassword);

        if (user != null) {
            if (user.getInfo() == 0) {
                return new LoginModel("SETINFO", "Sign in successful", user);
            }
            return new LoginModel("SUCCESS", "Sign in successful", user);
        } else {
            return new LoginModel("FAILED", "Email or password is incorrect", null);
        }
    }

    public LoginModel setUser(Map<String, Object> requestData) {
        String uuid = UUID.randomUUID().toString().split("-")[0];
        String reqName = (String) requestData.get("name");
        String reqEmail = (String) requestData.get("email");
        String reqPassword = (String) requestData.get("password");

        if (loginMapper.setUser(uuid, reqName, reqEmail, reqPassword) == 1) {
            return new LoginModel("SUCCESS", "Sign up successful",
                    new LoginDTO(uuid, reqEmail, reqPassword, reqName));
        } else {
            return new LoginModel("FAILED", "Sign up failed", null);
        }
    }

    public LoginModel checkGoogle(Map<String, Object> requestData) {
        String uuid = UUID.randomUUID().toString().split("-")[0];
        String reqId = (String) requestData.get("id");
        String reqEmail = (String) requestData.get("email");
        String reqName = (String) requestData.get("name");
        String reqPicture = (String) requestData.get("picture");
        LoginDTO user = loginMapper.checkGoogle(reqId);

        if (user != null) {
            if (user.getInfo() == 0) {
                return new LoginModel("SETINFO", "Sign in successful", user);
            }
            return new LoginModel("SUCCESS", "Sign in successful", user);
        } else {
            if (loginMapper.setGoogle(uuid, reqId, reqEmail, reqName, reqPicture) == 1) {
                return new LoginModel("SETINFO", "Sign in successful",
                        new LoginDTO(uuid, reqEmail, reqId, reqName, reqPicture));
            } else {
                return new LoginModel("FAILED", "Google login canceled", null);
            }
        }
    }

}

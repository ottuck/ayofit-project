package com.app.ayofit.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.LoginModel;
import com.app.ayofit.service.LoginDAO;

@RestController
@RequestMapping("api")
public class LoginController {

    @Autowired
    private LoginDAO loginDAO;

    @PostMapping("login")
    public LoginModel checkLogin(@RequestBody Map<String, Object> requestData) {
        return loginDAO.checkLogin(requestData);
    }

    @PostMapping("signup")
    public LoginModel setUser(@RequestBody Map<String, Object> requestData) {
        return loginDAO.setUser(requestData);
    }

    @PostMapping("google")
    public LoginModel checkGoggle(@RequestBody Map<String, Object> requestData) {
        return loginDAO.checkGoogle(requestData);
    }

}
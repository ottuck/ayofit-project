package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.UserDTO;
import com.app.ayofit.service.UserDAO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserDAO uDAO;

    @GetMapping("")
    public List<UserDTO> getAllUserProfile() {
        return uDAO.getAllUserProfile();
    }

    @GetMapping("{id}")
    public UserDTO getMethodName(@PathVariable("id") String id) {
        return uDAO.getUserProfile(id);
    }
    
    @PutMapping("{id}")
    public void setUserProfile(
        @PathVariable("id") String id,
        @RequestParam("pw") String pw,
        @RequestParam("name") String name
    ) {
        uDAO.setUserProfile(id, pw, name);
    }

    @PostMapping("{id}")
    public void updateUserProfile(
        @PathVariable("id") String oldId,
        @RequestParam("id") String newId,
        @RequestParam("pw") String pw,
        @RequestParam("name") String name
    ) {
        uDAO.updateUserProfile(oldId, newId, pw, name);
    }

    @DeleteMapping("{id}")
    public void deleteUserProfile(@PathVariable("id") String id) {
        uDAO.deleteUserProfile(id);
    }
    
}

package com.app.ayofit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.ayofit.mapper.UserMapper;
import com.app.ayofit.model.UserDTO;

@Service
public class UserDAO {

    private UserMapper uMapper;

    public UserDAO(UserMapper uMapper) {
        this.uMapper = uMapper;
    }

    public List<UserDTO> getAllUserProfile() {
        return uMapper.getAllUserProfile();
    }

    public UserDTO getUserProfile(String id) {
        return uMapper.getUserProfile(id);
    }

    public boolean setUserProfile(
        String id,
        String pw,
        String name
    ) {
        if(uMapper.setUserProfile(id, pw, name) == 1) return true;
        return false;
    }
    
    public boolean updateUserProfile(
        String oldId,
        String newId,
        String pw,
        String name
    ) {
        if(uMapper.updateUserProfile(oldId, newId, pw, name) == 1) return true;
        return false;
    }
    
    public boolean deleteUserProfile(String id) {
        if (uMapper.deleteUserProfile(id) == 1) return true;
        return false;
    }
    

}

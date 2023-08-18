package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.UserDTO;

@Mapper
public interface UserMapper {

    List<UserDTO> getAllUserProfile();

    UserDTO getUserProfile(String id);

    int setUserProfile(
        @Param("id") String id,
        @Param("pw") String pw,
        @Param("name") String name
    );

    int updateUserProfile(
        @Param("oldId") String oldId,
        @Param("newId") String newId,
        @Param("pw") String pw,
        @Param("name") String name
    );

    int deleteUserProfile(String id);
    

}

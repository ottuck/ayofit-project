package com.app.ayofit.model;

public class LoginDTO {

    private String id;
    private String email;
    private String password;
    private String name;
    private String picture;
    private String type;
    private int info;

    public LoginDTO() {
    }

    public LoginDTO(String id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public LoginDTO(String id, String email, String password, String name, String picture) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.picture = picture;
    }

    public LoginDTO(String id, String email, String password, String name, String picture, String type, int info) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.picture = picture;
        this.type = type;
        this.info = info;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getInfo() {
        return info;
    }

    public void setInfo(int info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "LoginDTO [id=" + id + ", email=" + email + ", password=" + password + ", name=" + name + ", picture="
                + picture + ", type=" + type + ", info=" + info + "]";
    }

}
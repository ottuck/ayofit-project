package com.app.ayofit.model;

public class LoginModel {

    private String status;
    private String message;
    private LoginDTO data;

    public LoginModel(String status, String message, LoginDTO data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LoginDTO getData() {
        return data;
    }

    public void setData(LoginDTO data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "LoginModel [status=" + status + ", message=" + message + ", data=" + data + "]";
    }

}

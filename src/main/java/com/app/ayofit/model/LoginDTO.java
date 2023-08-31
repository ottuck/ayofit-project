package com.app.ayofit.model;

public class LoginDTO {

    private String status;
    private String message;
    private AccountDTO data;

    public LoginDTO() {
    }

    public LoginDTO(String status, String message, AccountDTO data) {
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

    public AccountDTO getData() {
        return data;
    }

    public void setData(AccountDTO data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "LoginDTO [status=" + status + ", message=" + message + ", data=" + data + "]";
    }

}
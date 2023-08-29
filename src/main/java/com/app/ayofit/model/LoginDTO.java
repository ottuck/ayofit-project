package com.app.ayofit.model;

import java.util.List;

public class LoginDTO {

    private String status;
    private String message;
    private List<AccountDTO> data;

    public LoginDTO(String status, String message, List<AccountDTO> data) {
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

    public List<AccountDTO> getData() {
        return data;
    }

    public void setData(List<AccountDTO> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "LoginDTO [status=" + status + ", message=" + message + ", data=" + data + "]";
    }

}

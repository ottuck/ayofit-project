package com.app.ayofit.model;

public class SiginupDTO {

    private String status;
    private String message;
    private AccountDTO data;

    public SiginupDTO(String status, String message, AccountDTO data) {
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

}

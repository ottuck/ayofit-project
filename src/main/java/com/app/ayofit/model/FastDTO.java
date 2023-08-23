package com.app.ayofit.model;

public class FastDTO {
	
    private String ConfirmStartTime;
    private String ConfirmEndTime;
    private String timerMethod;

    public FastDTO() {
		// TODO Auto-generated constructor stub
	}

	public FastDTO(String confirmStartTime, String confirmEndTime, String timerMethod) {
		super();
		ConfirmStartTime = confirmStartTime;
		ConfirmEndTime = confirmEndTime;
		this.timerMethod = timerMethod;
	}

	public String getConfirmStartTime() {
		return ConfirmStartTime;
	}

	public void setConfirmStartTime(String confirmStartTime) {
		ConfirmStartTime = confirmStartTime;
	}

	public String getConfirmEndTime() {
		return ConfirmEndTime;
	}

	public void setConfirmEndTime(String confirmEndTime) {
		ConfirmEndTime = confirmEndTime;
	}

	public String getTimerMethod() {
		return timerMethod;
	}

	public void setTimerMethod(String timerMethod) {
		this.timerMethod = timerMethod;
	}

	@Override
	public String toString() {
		return "FastDTO [ConfirmStartTime=" + ConfirmStartTime + ", ConfirmEndTime=" + ConfirmEndTime + ", timerMethod="
				+ timerMethod + "]";
	}
    
    
}

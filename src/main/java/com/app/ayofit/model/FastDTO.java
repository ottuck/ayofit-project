package com.app.ayofit.model;

import java.util.Date;

public class FastDTO {
	
   private String ConfirmStartTime;
   private String ConfirmEndTime;
   private int TimerMethod;
   
   public FastDTO() {
	// TODO Auto-generated constructor stub
}

public FastDTO(String confirmStartTime, String confirmEndTime, int timerMethod) {
	super();
	ConfirmStartTime = confirmStartTime;
	ConfirmEndTime = confirmEndTime;
	TimerMethod = timerMethod;
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

public int getTimerMethod() {
	return TimerMethod;
}

public void setTimerMethod(int timerMethod) {
	TimerMethod = timerMethod;
}

@Override
public String toString() {
	return "FastDTO [ConfirmStartTime=" + ConfirmStartTime + ", ConfirmEndTime=" + ConfirmEndTime + ", TimerMethod="
			+ TimerMethod + "]";
}


    
}

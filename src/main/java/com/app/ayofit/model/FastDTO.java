package com.app.ayofit.model;

import java.util.Date;

public class FastDTO {
	
   private String confirmStartTime;
   private String confirmEndTime;
   private int elapsedTime;
   
   public FastDTO() {
	// TODO Auto-generated constructor stub
}

public FastDTO(String confirmStartTime, String confirmEndTime, int elapsedTime) {
	super();
	this.confirmStartTime = confirmStartTime;
	this.confirmEndTime = confirmEndTime;
	this.elapsedTime = elapsedTime;
}

public String getConfirmStartTime() {
	return confirmStartTime;
}

public void setConfirmStartTime(String confirmStartTime) {
	this.confirmStartTime = confirmStartTime;
}

public String getConfirmEndTime() {
	return confirmEndTime;
}

public void setConfirmEndTime(String confirmEndTime) {
	this.confirmEndTime = confirmEndTime;
}

public int getElapsedTime() {
	return elapsedTime;
}

public void setElapsedTime(int elapsedTime) {
	this.elapsedTime = elapsedTime;
}

@Override
public String toString() {
	return "FastDTO [confirmStartTime=" + confirmStartTime + ", confirmEndTime=" + confirmEndTime + ", elapsedTime="
			+ elapsedTime + "]";
}

}

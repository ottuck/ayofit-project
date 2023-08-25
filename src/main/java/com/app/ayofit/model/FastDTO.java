package com.app.ayofit.model;

import java.util.Date;

public class FastDTO {
	
   private String ConfirmStartTime;
   private String ConfirmEndTime;
   private int elapsedTime;
   
   public FastDTO() {
	// TODO Auto-generated constructor stub
}

public FastDTO(String confirmStartTime, String confirmEndTime, int elapsedTime) {
	super();
	ConfirmStartTime = confirmStartTime;
	ConfirmEndTime = confirmEndTime;
	this.elapsedTime = elapsedTime;
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

public int getElapsedTime() {
	return elapsedTime;
}

public void setElapsedTime(int elapsedTime) {
	this.elapsedTime = elapsedTime;
}

@Override
public String toString() {
	return "FastDTO [ConfirmStartTime=" + ConfirmStartTime + ", ConfirmEndTime=" + ConfirmEndTime + ", elapsedTime="
			+ elapsedTime + "]";
}

}

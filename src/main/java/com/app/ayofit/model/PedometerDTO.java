package com.app.ayofit.model;

import java.util.Date;

public class PedometerDTO {
	  private String pId;
	  private Date pDate;
	  private int pStepcnt;
	  private int pStepgoal;
	  
	  public PedometerDTO() {
		// TODO Auto-generated constructor stub
	}

	public PedometerDTO(String pId, Date pDate, int pStepcnt, int pStepgoal) {
		super();
		this.pId = pId;
		this.pDate = pDate;
		this.pStepcnt = pStepcnt;
		this.pStepgoal = pStepgoal;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public Date getpDate() {
		return pDate;
	}

	public void setpDate(Date pDate) {
		this.pDate = pDate;
	}

	public int getpStepcnt() {
		return pStepcnt;
	}

	public void setpStepcnt(int pStepcnt) {
		this.pStepcnt = pStepcnt;
	}

	public int getpStepgoal() {
		return pStepgoal;
	}

	public void setpStepgoal(int pStepgoal) {
		this.pStepgoal = pStepgoal;
	}
	  
	  
	  
	
	  

}

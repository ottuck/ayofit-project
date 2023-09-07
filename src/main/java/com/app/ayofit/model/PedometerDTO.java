package com.app.ayofit.model;

import java.util.Date;

public class PedometerDTO {
	 private int pNo;
	 private String pId;
	 private Date pDate;
	 private int pStepCnt;
	 private int pStepGoal;
	 
	 public PedometerDTO() {
		// TODO Auto-generated constructor stub
	}

	public PedometerDTO(int pNo, String pId, Date pDate, int pStepCnt, int pStepGoal) {
		super();
		this.pNo = pNo;
		this.pId = pId;
		this.pDate = pDate;
		this.pStepCnt = pStepCnt;
		this.pStepGoal = pStepGoal;
	}

	public int getpNo() {
		return pNo;
	}

	public void setpNo(int pNo) {
		this.pNo = pNo;
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

	public int getpStepCnt() {
		return pStepCnt;
	}

	public void setpStepCnt(int pStepCnt) {
		this.pStepCnt = pStepCnt;
	}

	public int getpStepGoal() {
		return pStepGoal;
	}

	public void setpStepGoal(int pStepGoal) {
		this.pStepGoal = pStepGoal;
	}

	@Override
	public String toString() {
		return "PedometerDTO [pNo=" + pNo + ", pId=" + pId + ", pDate=" + pDate + ", pStepCnt=" + pStepCnt
				+ ", pStepGoal=" + pStepGoal + "]";
	}
	 
	
	 
	 

	
	 
	 
	    
	    
	    
	   
	    
	
	  
	  
	
	  
	
}

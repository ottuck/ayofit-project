package com.app.ayofit.model;

import java.sql.Date;

public class PedometerDTO {
	  private int pNo;        // 시퀀스로 생성되는 값
	    private String pId;      // 사용자 ID
	    private Date pDate; // 날짜
	    private int pStepCnt;    // 걸음 수
	    private int pStepGoal;   // 목표 걸음 수
	    
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
	    
	    
	    
	   
	    
	
	  
	  
	
	  
	
}

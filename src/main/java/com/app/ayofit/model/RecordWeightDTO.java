package com.app.ayofit.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RecordWeightDTO {
	private int rNo;
    private String rId;
    private Double rWeight;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yy-MM-dd", timezone="Asia/Seoul")
    private Date rWeightDate;
    
    public RecordWeightDTO() {
		// TODO Auto-generated constructor stub
	}

	public RecordWeightDTO(int rNo, String rId, Double rWeight, Date rWeightDate) {
		super();
		this.rNo = rNo;
		this.rId = rId;
		this.rWeight = rWeight;
		this.rWeightDate = rWeightDate;
	}

	public int getrNo() {
		return rNo;
	}

	public void setrNo(int rNo) {
		this.rNo = rNo;
	}

	public String getrId() {
		return rId;
	}

	public void setrId(String rId) {
		this.rId = rId;
	}

	public Double getrWeight() {
		return rWeight;
	}

	public void setrWeight(Double rWeight) {
		this.rWeight = rWeight;
	}

	public Date getrWeightDate() {
		return rWeightDate;
	}

	public void setrWeightDate(Date rWeightDate) {
		this.rWeightDate = rWeightDate;
	}
    
    
}

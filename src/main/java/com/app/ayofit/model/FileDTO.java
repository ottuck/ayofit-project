package com.app.ayofit.model;

import java.util.Date;

public class FileDTO {
	
	private int fNo;
	private String fId;
	private String fImg;
	private Date fDate;
	private String fType;
	
	public FileDTO() {
		// TODO Auto-generated constructor stub
	}

	public FileDTO(int fNo, String fId, String fImg, Date fDate, String fType) {
		super();
		this.fNo = fNo;
		this.fId = fId;
		this.fImg = fImg;
		this.fDate = fDate;
		this.fType = fType;
	}

	public int getfNo() {
		return fNo;
	}

	public void setfNo(int fNo) {
		this.fNo = fNo;
	}

	public String getfId() {
		return fId;
	}

	public void setfId(String fId) {
		this.fId = fId;
	}

	public String getfImg() {
		return fImg;
	}

	public void setfImg(String fImg) {
		this.fImg = fImg;
	}

	public Date getfDate() {
		return fDate;
	}

	public void setfDate(Date fDate) {
		this.fDate = fDate;
	}

	public String getfType() {
		return fType;
	}

	public void setfType(String fType) {
		this.fType = fType;
	}

	@Override
	public String toString() {
		return "FileDTO [fNo=" + fNo + ", fId=" + fId + ", fImg=" + fImg + ", fDate=" + fDate + ", fType=" + fType
				+ "]";
	}
	
}

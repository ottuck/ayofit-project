package com.app.ayofit.model;

public class FavDTO {
	
	private int favNo;
	private String favId;
	private int recordMealNo;
	
	public FavDTO() {
		// TODO Auto-generated constructor stub
	}

	public FavDTO(int favNo, String favId, int recordMealNo) {
		super();
		this.favNo = favNo;
		this.favId = favId;
		this.recordMealNo = recordMealNo;
	}

	public int getFavNo() {
		return favNo;
	}

	public void setFavNo(int favNo) {
		this.favNo = favNo;
	}

	public String getFavId() {
		return favId;
	}

	public void setFavId(String favId) {
		this.favId = favId;
	}

	public int getRecordMealNo() {
		return recordMealNo;
	}

	public void setRecordMealNo(int recordMealNo) {
		this.recordMealNo = recordMealNo;
	}

	@Override
	public String toString() {
		return "FavDTO [favNo=" + favNo + ", favId=" + favId + ", recordMealNo=" + recordMealNo + "]";
	}
	
}

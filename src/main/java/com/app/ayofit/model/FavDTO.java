package com.app.ayofit.model;

public class FavDTO {
	
	private int favNo;
	private String favId;
	private int nutritionNo;
	
	public FavDTO() {
		// TODO Auto-generated constructor stub
	}

	public FavDTO(int favNo, String favId, int nutritionNo) {
		super();
		this.favNo = favNo;
		this.favId = favId;
		this.nutritionNo = nutritionNo;
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

	public int getNutritionNo() {
		return nutritionNo;
	}

	public void setNutritionNo(int nutritionNo) {
		this.nutritionNo = nutritionNo;
	}

	@Override
	public String toString() {
		return "FavDTO [favNo=" + favNo + ", favId=" + favId + ", nutritionNo=" + nutritionNo + "]";
	}
	
	
}

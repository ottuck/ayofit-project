package com.app.ayofit.model;

public class MealDTO {
	private int rNO;
	private String rID;
	private String rFoodName;
	private String rMealType;
	private String rMealDate;
	private String rCarbohydrate;
	private String rProtein;
	private String rFat;
	
	public MealDTO() {
		// TODO Auto-generated constructor stub
	}

	public MealDTO(int rNO, String rID, String rFoodName, String rMealType, String rMealDate, String rCarbohydrate,
			String rProtein, String rFat) {
		super();
		this.rNO = rNO;
		this.rID = rID;
		this.rFoodName = rFoodName;
		this.rMealType = rMealType;
		this.rMealDate = rMealDate;
		this.rCarbohydrate = rCarbohydrate;
		this.rProtein = rProtein;
		this.rFat = rFat;
	}

	public int getrNO() {
		return rNO;
	}

	public void setrNO(int rNO) {
		this.rNO = rNO;
	}

	public String getrID() {
		return rID;
	}

	public void setrID(String rID) {
		this.rID = rID;
	}

	public String getrFoodName() {
		return rFoodName;
	}

	public void setrFoodName(String rFoodName) {
		this.rFoodName = rFoodName;
	}

	public String getrMealType() {
		return rMealType;
	}

	public void setrMealType(String rMealType) {
		this.rMealType = rMealType;
	}

	public String getrMealDate() {
		return rMealDate;
	}

	public void setrMealDate(String rMealDate) {
		this.rMealDate = rMealDate;
	}

	public String getrCarbohydrate() {
		return rCarbohydrate;
	}

	public void setrCarbohydrate(String rCarbohydrate) {
		this.rCarbohydrate = rCarbohydrate;
	}

	public String getrProtein() {
		return rProtein;
	}

	public void setrProtein(String rProtein) {
		this.rProtein = rProtein;
	}

	public String getrFat() {
		return rFat;
	}

	public void setrFat(String rFat) {
		this.rFat = rFat;
	}

	@Override
	public String toString() {
		return "MealDTO [rNO=" + rNO + ", rID=" + rID + ", rFoodName=" + rFoodName + ", rMealType=" + rMealType
				+ ", rMealDate=" + rMealDate + ", rCarbohydrate=" + rCarbohydrate + ", rProtein=" + rProtein + ", rFat="
				+ rFat + "]";
	}
	
}

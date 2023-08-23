package com.app.ayofit.model;

public class GoalDTO {
	private double tarWeight;
	private double calorie;
	private double carb;
	private double protein;
	private double fat;
	
	public GoalDTO() {
		// TODO Auto-generated constructor stub
	}

	public GoalDTO(double tarWeight, double calorie, double carb, double protein, double fat) {
		super();
		this.tarWeight = tarWeight;
		this.calorie = calorie;
		this.carb = carb;
		this.protein = protein;
		this.fat = fat;
	}

	public double getTarWeight() {
		return tarWeight;
	}

	public void setTarWeight(double tarWeight) {
		this.tarWeight = tarWeight;
	}

	public double getCalorie() {
		return calorie;
	}

	public void setCalorie(double calorie) {
		this.calorie = calorie;
	}

	public double getCarb() {
		return carb;
	}

	public void setCarb(double carb) {
		this.carb = carb;
	}

	public double getProtein() {
		return protein;
	}

	public void setProtein(double protein) {
		this.protein = protein;
	}

	public double getFat() {
		return fat;
	}

	public void setFat(double fat) {
		this.fat = fat;
	}

	@Override
	public String toString() {
		return "GoalDTO [tarWeight=" + tarWeight + ", calorie=" + calorie + ", carb=" + carb + ", protein=" + protein
				+ ", fat=" + fat + "]";
	}

}

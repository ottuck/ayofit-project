package com.app.ayofit.model;

public class NutritionInfo {
	
	private double totalCarbohydrate;
    private double totalProtein;
    private double totalFat;
    
    public NutritionInfo() {
		// TODO Auto-generated constructor stub
	}

	public NutritionInfo(double totalCarbohydrate, double totalProtein, double totalFat) {
		super();
		this.totalCarbohydrate = totalCarbohydrate;
		this.totalProtein = totalProtein;
		this.totalFat = totalFat;
	}

	public double getTotalCarbohydrate() {
		return totalCarbohydrate;
	}

	public void setTotalCarbohydrate(double totalCarbohydrate) {
		this.totalCarbohydrate = totalCarbohydrate;
	}

	public double getTotalProtein() {
		return totalProtein;
	}

	public void setTotalProtein(double totalProtein) {
		this.totalProtein = totalProtein;
	}

	public double getTotalFat() {
		return totalFat;
	}

	public void setTotalFat(double totalFat) {
		this.totalFat = totalFat;
	}
    
    
    
}

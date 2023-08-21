package com.app.ayofit.model;

public class RecordDTO {
	
	private int n_no;
	private String n_food_name;
	private String n_maker_name;
	private double n_size;
	private double n_kcal;
	private double n_carbohydrate;
	private double n_protein;
	private double n_fat;
	
	public RecordDTO(int n_no, String n_food_name, String n_maker_name, double n_size, double n_kcal,
			double n_carbohydrate, double n_protein, double n_fat) {
		super();
		this.n_no = n_no;
		this.n_food_name = n_food_name;
		this.n_maker_name = n_maker_name;
		this.n_size = n_size;
		this.n_kcal = n_kcal;
		this.n_carbohydrate = n_carbohydrate;
		this.n_protein = n_protein;
		this.n_fat = n_fat;
	}

	public int getN_no() {
		return n_no;
	}

	public String getN_food_name() {
		return n_food_name;
	}

	public String getN_maker_name() {
		return n_maker_name;
	}

	public double getN_size() {
		return n_size;
	}

	public double getN_kcal() {
		return n_kcal;
	}

	public double getN_carbohydrate() {
		return n_carbohydrate;
	}

	public double getN_protein() {
		return n_protein;
	}

	public double getN_fat() {
		return n_fat;
	}
	
	
	
	
	
}


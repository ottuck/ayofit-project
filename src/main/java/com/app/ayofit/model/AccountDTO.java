package com.app.ayofit.model;

public class AccountDTO {

	private int age;
	private String gender;
	private double height;
	private double curWeight;
	private String activity;

	public AccountDTO() {
	}

	public AccountDTO(int age, String gender, double height, double curWeight, String activity) {
		this.age = age;
		this.gender = gender;
		this.height = height;
		this.curWeight = curWeight;
		this.activity = activity;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getCurWeight() {
		return curWeight;
	}

	public void setCurWeight(double curWeight) {
		this.curWeight = curWeight;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	@Override
	public String toString() {
		return "AccountDTO [age=" + age + ", gender=" + gender + ", height=" + height + ", curWeight=" + curWeight
				+ ", activity=" + activity + "]";
	}

}
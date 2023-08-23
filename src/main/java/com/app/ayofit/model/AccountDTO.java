package com.app.ayofit.model;

public class AccountDTO {
	private String gender;
	private int age;
	private double height;
	private double curWeight;
	private String activity;
	
	public AccountDTO() {
		// TODO Auto-generated constructor stub
	}

	public AccountDTO(String gender, int age, double height, double curWeight, String activity) {
		super();
		this.gender = gender;
		this.age = age;
		this.height = height;
		this.curWeight = curWeight;
		this.activity = activity;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
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
		return "AccountDTO [gender=" + gender + ", age=" + age + ", height=" + height + ", curWeight=" + curWeight
				+ ", activity=" + activity + "]";
	}
		
}

package com.app.ayofit.model;

public class AccountDTO {

	private String l_id;
	private String l_email;
	private String l_password;
	private String l_name;
	private String l_info;
	private String l_google;
	private String gender;
	private int age;
	private double height;
	private double curWeight;
	private String activity;

	public AccountDTO() {
	}

	public AccountDTO(String l_id, String l_email, String l_password, String l_name, String l_info, String l_google,
			String gender, int age, double height, double curWeight, String activity) {
		this.l_id = l_id;
		this.l_email = l_email;
		this.l_password = l_password;
		this.l_name = l_name;
		this.l_info = l_info;
		this.l_google = l_google;
		this.gender = gender;
		this.age = age;
		this.height = height;
		this.curWeight = curWeight;
		this.activity = activity;
	}

	public String getL_id() {
		return l_id;
	}

	public void setL_id(String l_id) {
		this.l_id = l_id;
	}

	public String getL_email() {
		return l_email;
	}

	public void setL_email(String l_email) {
		this.l_email = l_email;
	}

	public String getL_password() {
		return l_password;
	}

	public void setL_password(String l_password) {
		this.l_password = l_password;
	}

	public String getL_name() {
		return l_name;
	}

	public void setL_name(String l_name) {
		this.l_name = l_name;
	}

	public String getL_info() {
		return l_info;
	}

	public void setL_info(String l_info) {
		this.l_info = l_info;
	}

	public String getL_google() {
		return l_google;
	}

	public void setL_google(String l_google) {
		this.l_google = l_google;
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

}
package com.app.ayofit.model;

public class AccountDTO {

	private String l_id;
	private String l_email;
	private String l_password;
	private String l_name;
	private String l_picture;
	private String l_type;
	private String l_info;
	private int a_type;
	private int age;
	private String gender;
	private double height;
	private double curWeight;
	private String activity;

	public AccountDTO(String l_id, String l_email, String l_password, String l_name, String l_info) {
		this.l_id = l_id;
		this.l_email = l_email;
		this.l_password = l_password;
		this.l_name = l_name;
		this.l_info = l_info;
	}

	public AccountDTO(String l_id, String l_email, String l_password, String l_name, String l_picture, String l_type,
			String l_info, int a_type, int age, String gender, double height, double curWeight, String activity) {
		this.l_id = l_id;
		this.l_email = l_email;
		this.l_password = l_password;
		this.l_name = l_name;
		this.l_picture = l_picture;
		this.l_type = l_type;
		this.l_info = l_info;
		this.a_type = a_type;
		this.age = age;
		this.gender = gender;
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

	public String getL_picture() {
		return l_picture;
	}

	public void setL_picture(String l_picture) {
		this.l_picture = l_picture;
	}

	public String getL_type() {
		return l_type;
	}

	public void setL_type(String l_type) {
		this.l_type = l_type;
	}

	public String getL_info() {
		return l_info;
	}

	public void setL_info(String l_info) {
		this.l_info = l_info;
	}

	public int getA_type() {
		return a_type;
	}

	public void setA_type(int a_type) {
		this.a_type = a_type;
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
		return "AccountDTO [l_id=" + l_id + ", l_email=" + l_email + ", l_password=" + l_password + ", l_name=" + l_name
				+ ", l_picture=" + l_picture + ", l_type=" + l_type + ", l_info=" + l_info + ", a_type=" + a_type
				+ ", age=" + age + ", gender=" + gender + ", height=" + height + ", curWeight=" + curWeight
				+ ", activity=" + activity + "]";
	}

}
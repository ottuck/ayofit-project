package com.app.ayofit.model;

public class AccountDTO {
	private String l_id;
	private String l_email;
	private String l_password;
	private String l_name;
	private String l_info;
	private String l_google;
	private int a_age;
	private String a_gender;
	private double a_height;
	private double a_weight;
	private String a_activity;

	public AccountDTO(String l_id, String l_email, String l_password, String l_name, String l_info, String l_google,
			int a_age, String a_gender, double a_height, double a_weight, String a_activity) {
		this.l_id = l_id;
		this.l_email = l_email;
		this.l_password = l_password;
		this.l_name = l_name;
		this.l_info = l_info;
		this.l_google = l_google;
		this.a_age = a_age;
		this.a_gender = a_gender;
		this.a_height = a_height;
		this.a_weight = a_weight;
		this.a_activity = a_activity;
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

	public int getA_age() {
		return a_age;
	}

	public void setA_age(int a_age) {
		this.a_age = a_age;
	}

	public String getA_gender() {
		return a_gender;
	}

	public void setA_gender(String a_gender) {
		this.a_gender = a_gender;
	}

	public double getA_height() {
		return a_height;
	}

	public void setA_height(double a_height) {
		this.a_height = a_height;
	}

	public double getA_weight() {
		return a_weight;
	}

	public void setA_weight(double a_weight) {
		this.a_weight = a_weight;
	}

	public String getA_activity() {
		return a_activity;
	}

	public void setA_activity(String a_activity) {
		this.a_activity = a_activity;
	}

	@Override
	public String toString() {
		return "AccountDTO [l_id=" + l_id + ", l_email=" + l_email + ", l_password=" + l_password + ", l_name=" + l_name
				+ ", l_info=" + l_info + ", l_google=" + l_google + ", a_age=" + a_age + ", a_gender=" + a_gender
				+ ", a_height=" + a_height + ", a_weight=" + a_weight + ", a_activity=" + a_activity + "]";
	}

}

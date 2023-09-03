package com.app.ayofit.model;

public class FavDTO {
	
	private int favNo;
	private String favName;
	private String favKcal;
	private String favCarb;
	private String favProtein;
	private String favFat;
	
	public FavDTO() {
		// TODO Auto-generated constructor stub
	}

	public FavDTO(int favNo, String favName, String favKcal, String favCarb, String favProtein, String favFat) {
		super();
		this.favNo = favNo;
		this.favName = favName;
		this.favKcal = favKcal;
		this.favCarb = favCarb;
		this.favProtein = favProtein;
		this.favFat = favFat;
	}

	public int getFavNo() {
		return favNo;
	}

	public void setFavNo(int favNo) {
		this.favNo = favNo;
	}

	public String getFavName() {
		return favName;
	}

	public void setFavName(String favName) {
		this.favName = favName;
	}

	public String getFavKcal() {
		return favKcal;
	}

	public void setFavKcal(String favKcal) {
		this.favKcal = favKcal;
	}

	public String getFavCarb() {
		return favCarb;
	}

	public void setFavCarb(String favCarb) {
		this.favCarb = favCarb;
	}

	public String getFavProtein() {
		return favProtein;
	}

	public void setFavProtein(String favProtein) {
		this.favProtein = favProtein;
	}

	public String getFavFat() {
		return favFat;
	}

	public void setFavFat(String favFat) {
		this.favFat = favFat;
	}

	@Override
	public String toString() {
		return "FavDTO [favNo=" + favNo + ", favName=" + favName + ", favKcal=" + favKcal + ", favCarb=" + favCarb
				+ ", favProtein=" + favProtein + ", favFat=" + favFat + "]";
	}
	
}

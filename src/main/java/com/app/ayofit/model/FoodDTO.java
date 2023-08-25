package com.app.ayofit.model;

public class FoodDTO {
	
	private int nNO;
	private String nFoodName;
	private String nMakerName;
	private String nSize;
	private String nKcal;
	private String nCarbohydrate;
	private String nProtein;
	private String nFat;
	
	public FoodDTO() {
		// TODO Auto-generated constructor stub
	}

	public FoodDTO(int nNO, String nFoodName, String nMakerName, String nSize, String nKcal, String nCarbohydrate,
			String nProtein, String nFat) {
		super();
		this.nNO = nNO;
		this.nFoodName = nFoodName;
		this.nMakerName = nMakerName;
		this.nSize = nSize;
		this.nKcal = nKcal;
		this.nCarbohydrate = nCarbohydrate;
		this.nProtein = nProtein;
		this.nFat = nFat;
	}

	public int getnNO() {
		return nNO;
	}

	public void setnNO(int nNO) {
		this.nNO = nNO;
	}

	public String getnFoodName() {
		return nFoodName;
	}

	public void setnFoodName(String nFoodName) {
		this.nFoodName = nFoodName;
	}

	public String getnMakerName() {
		return nMakerName;
	}

	public void setnMakerName(String nMakerName) {
		this.nMakerName = nMakerName;
	}

	public String getnSize() {
		return nSize;
	}

	public void setnSize(String nSize) {
		this.nSize = nSize;
	}

	public String getnKcal() {
		return nKcal;
	}

	public void setnKcal(String nKcal) {
		this.nKcal = nKcal;
	}

	public String getnCarbohydrate() {
		return nCarbohydrate;
	}

	public void setnCarbohydrate(String nCarbohydrate) {
		this.nCarbohydrate = nCarbohydrate;
	}

	public String getnProtein() {
		return nProtein;
	}

	public void setnProtein(String nProtein) {
		this.nProtein = nProtein;
	}

	public String getnFat() {
		return nFat;
	}

	public void setnFat(String nFat) {
		this.nFat = nFat;
	}

	@Override
	public String toString() {
		return "FoodDTO [nNO=" + nNO + ", nFoodName=" + nFoodName + ", nMakerName=" + nMakerName + ", nSize=" + nSize
				+ ", nKcal=" + nKcal + ", nCarbohydrate=" + nCarbohydrate + ", nProtein=" + nProtein + ", nFat=" + nFat
				+ "]";
	}
	
	
}

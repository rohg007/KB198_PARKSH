package com.rohg007.android.diseasex.models;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Disease implements Parcelable {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("scientificName")
    @Expose
    private String scientificName = "Scientific Name not Available";
    @SerializedName("precautions")
    @Expose
    private String precautions = "Precautions not Available";
    @SerializedName("symptoms")
    @Expose
    private String symptoms = "Symptoms not Available";
    @SerializedName("morbidity")
    @Expose
    private Integer morbidity=0;
    @SerializedName("mortality")
    @Expose
    private Integer mortality=0;
    @SerializedName("total_affected")
    @Expose
    private Integer totalAffected=0;
    @SerializedName("total_deaths")
    @Expose
    private Integer totalDeaths=0;
    @SerializedName("livestock")
    @Expose
    private List<Livestock> livestock = new ArrayList<>();
    @SerializedName("vaccine")
    @Expose
    private List<Vaccine> vaccine = new ArrayList<>();
    @SerializedName("__v")
    @Expose
    private Integer v;

    public Disease() {
    }

    public Disease(String id, String name, String scientificName, String precautions, String symptoms, Integer morbidity, Integer mortality, Integer totalAffected, Integer totalDeaths, List<Livestock> livestock, List<Vaccine> vaccine, Integer v) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.precautions = precautions;
        this.symptoms = symptoms;
        this.morbidity = morbidity;
        this.mortality = mortality;
        this.totalAffected = totalAffected;
        this.totalDeaths = totalDeaths;
        this.livestock = livestock;
        this.vaccine = vaccine;
        this.v = v;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public String getPrecautions() {
        return precautions;
    }

    public void setPrecautions(String precautions) {
        this.precautions = precautions;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public Integer getMorbidity() {
        return morbidity;
    }

    public void setMorbidity(Integer morbidity) {
        this.morbidity = morbidity;
    }

    public Integer getMortality() {
        return mortality;
    }

    public void setMortality(Integer mortality) {
        this.mortality = mortality;
    }

    public Integer getTotalAffected() {
        return totalAffected;
    }

    public void setTotalAffected(Integer totalAffected) {
        this.totalAffected = totalAffected;
    }

    public Integer getTotalDeaths() {
        return totalDeaths;
    }

    public void setTotalDeaths(Integer totalDeaths) {
        this.totalDeaths = totalDeaths;
    }

    public List<Livestock> getLivestock() {
        return livestock;
    }

    public void setLivestock(List<Livestock> livestock) {
        this.livestock = livestock;
    }

    public List<Vaccine> getVaccine() {
        return vaccine;
    }

    public void setVaccine(List<Vaccine> vaccine) {
        this.vaccine = vaccine;
    }

    protected Disease(Parcel in){
        this.id = ((String) in.readValue((String.class.getClassLoader())));
        this.name = ((String) in.readValue((String.class.getClassLoader())));
        this.scientificName = ((String) in.readValue((String.class.getClassLoader())));
        this.precautions = ((String) in.readValue((String.class.getClassLoader())));
        this.symptoms = ((String) in.readValue((String.class.getClassLoader())));
        this.morbidity = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.mortality = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.totalAffected = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.totalDeaths = ((Integer) in.readValue((Integer.class.getClassLoader())));
        in.readList(this.livestock, (Livestock.class.getClassLoader()));
        in.readList(this.vaccine, (Vaccine.class.getClassLoader()));
        this.v = ((Integer) in.readValue((Integer.class.getClassLoader())));
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeValue(id);
        dest.writeValue(name);
        dest.writeValue(scientificName);
        dest.writeValue(precautions);
        dest.writeValue(symptoms);
        dest.writeValue(morbidity);
        dest.writeValue(mortality);
        dest.writeValue(totalAffected);
        dest.writeValue(totalDeaths);
        dest.writeList(livestock);
        dest.writeList(vaccine);
        dest.writeValue(v);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Disease> CREATOR = new Creator<Disease>() {
        @Override
        public Disease createFromParcel(Parcel source) {
            return new Disease(source);
        }

        @Override
        public Disease[] newArray(int size) {
            return new Disease[size];
        }
    };
}

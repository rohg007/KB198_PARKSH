package com.rohg007.android.diseasex.models;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Outbreak implements Parcelable {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("disease")
    @Expose
    private Disease disease;
    @SerializedName("healthCenter")
    @Expose
    private HealthCenter healthCenter;
    @SerializedName("lat")
    @Expose
    private String lat;
    @SerializedName("lng")
    @Expose
    private String lng;
    @SerializedName("deaths")
    @Expose
    private Integer deaths;
    @SerializedName("affected")
    @Expose
    private Integer affected;
    @SerializedName("flag")
    @Expose
    private Boolean flag;
    @SerializedName("totalInCluster")
    @Expose
    private Integer totalInCluster;
    @SerializedName("__v")
    @Expose
    private Integer v;

    public Outbreak() {
    }

    public Outbreak(String id, Disease disease, HealthCenter healthCenter, String lat, String lng, Integer deaths, Integer affected, Boolean flag, Integer totalInCluster, Integer v) {
        this.id = id;
        this.disease = disease;
        this.healthCenter = healthCenter;
        this.lat = lat;
        this.lng = lng;
        this.deaths = deaths;
        this.affected = affected;
        this.flag = flag;
        this.totalInCluster = totalInCluster;
        this.v = v;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Disease getDisease() {
        return disease;
    }

    public void setDisease(Disease disease) {
        this.disease = disease;
    }

    public HealthCenter getHealthCenter() {
        return healthCenter;
    }

    public void setHealthCenter(HealthCenter healthCenter) {
        this.healthCenter = healthCenter;
    }

    public LatLng getLatlng() {
        return new LatLng(Double.parseDouble(lat), Double.parseDouble(lng));
    }

    public Integer getDeaths() {
        return deaths;
    }

    public void setDeaths(Integer deaths) {
        this.deaths = deaths;
    }

    public Integer getAffected() {
        return affected;
    }

    public void setAffected(Integer affected) {
        this.affected = affected;
    }

    public Boolean getFlag() {
        return flag;
    }

    public void setFlag(Boolean flag) {
        this.flag = flag;
    }

    public Integer getTotalInCluster() {
        return totalInCluster;
    }

    public void setTotalInCluster(Integer totalInCluster) {
        this.totalInCluster = totalInCluster;
    }

    public Integer getV() {
        return v;
    }

    public void setV(Integer v) {
        this.v = v;
    }

    protected Outbreak(Parcel in) {
        this.id = ((String) in.readValue((String.class.getClassLoader())));
        this.disease = ((Disease) in.readValue((Disease.class.getClassLoader())));
        this.healthCenter = ((HealthCenter) in.readValue((HealthCenter.class.getClassLoader())));
        this.lat = ((String) in.readValue((String.class.getClassLoader())));
        this.lng = ((String) in.readValue((String.class.getClassLoader())));
        this.deaths = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.affected = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.flag = ((Boolean) in.readValue(Boolean.class.getClassLoader()));
        this.totalInCluster = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.v = ((Integer) in.readValue((Integer.class.getClassLoader())));
    }

    public void writeToParcel(Parcel dest, int flags) {
        dest.writeValue(id);
        dest.writeValue(disease);
        dest.writeValue(healthCenter);
        dest.writeValue(lat);
        dest.writeValue(lng);
        dest.writeValue(deaths);
        dest.writeValue(affected);
        dest.writeValue(flag);
        dest.writeValue(totalInCluster);
        dest.writeValue(v);
    }

    public int describeContents() {
        return 0;
    }

    public static final Creator<Outbreak> CREATOR = new Creator<Outbreak>() {
        @Override
        public Outbreak createFromParcel(Parcel source) {
            return new Outbreak(source);
        }

        @Override
        public Outbreak[] newArray(int size) {
            return new Outbreak[size];
        }
    };
}

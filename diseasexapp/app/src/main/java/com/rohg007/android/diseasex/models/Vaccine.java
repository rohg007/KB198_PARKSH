package com.rohg007.android.diseasex.models;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Vaccine implements Parcelable {
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("scientificName")
    @Expose
    private String scientificName;
    @SerializedName("duration")
    @Expose
    private Integer duration;
    @SerializedName("forHuman")
    @Expose
    private Boolean forHuman;

    public Vaccine() {
    }

    public Vaccine(String id, String name, String scientificName, Integer duration, Boolean forHuman) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.duration = duration;
        this.forHuman = forHuman;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean getForHuman() {
        return forHuman;
    }

    public void setForHuman(Boolean forHuman) {
        this.forHuman = forHuman;
    }

    protected Vaccine(Parcel in) {
        this.id = ((String) in.readValue((String.class.getClassLoader())));
        this.name = ((String) in.readValue((String.class.getClassLoader())));
        this.scientificName = ((String) in.readValue((String.class.getClassLoader())));
        this.duration = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.forHuman = ((Boolean) in.readValue((Boolean.class.getClassLoader())));
    }

    public void writeToParcel(Parcel dest, int flags) {
        dest.writeValue(id);
        dest.writeValue(name);
        dest.writeValue(scientificName);
        dest.writeValue(duration);
        dest.writeValue(forHuman);
    }

    public int describeContents() {
        return 0;
    }

    public static final Creator<Vaccine> CREATOR = new Creator<Vaccine>() {
        @Override
        public Vaccine createFromParcel(Parcel source) {
            return new Vaccine(source);
        }

        @Override
        public Vaccine[] newArray(int size) {
            return new Vaccine[size];
        }
    };
}

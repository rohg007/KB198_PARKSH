package com.rohg007.android.diseasex.models;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Livestock implements Parcelable {
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("breed")
    @Expose
    private String breed;
    @SerializedName("population")
    @Expose
    private Integer population;
    @SerializedName("__v")
    @Expose
    private Integer v;

    public Livestock() {
    }

    public Livestock(String id, String breed, Integer population) {
        this.id = id;
        this.breed = breed;
        this.population = population;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    protected Livestock(Parcel in) {
        this.id = ((String) in.readValue((String.class.getClassLoader())));
        this.breed = ((String) in.readValue((String.class.getClassLoader())));
        this.population = ((Integer) in.readValue((Integer.class.getClassLoader())));
    }

    public void writeToParcel(Parcel dest, int flags) {
        dest.writeValue(id);
        dest.writeValue(breed);
        dest.writeValue(population);
    }

    public int describeContents() {
        return 0;
    }

    public static final Creator<Livestock> CREATOR = new Creator<Livestock>() {
        @Override
        public Livestock createFromParcel(Parcel source) {
            return new Livestock(source);
        }

        @Override
        public Livestock[] newArray(int size) {
            return new Livestock[size];
        }
    };
}

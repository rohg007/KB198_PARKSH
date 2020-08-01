package com.rohg007.android.diseasex.models;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class HealthCenter implements Parcelable {
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("avatar")
    @Expose(serialize = false, deserialize = false)
    private String avatar;
    @SerializedName("password")
    @Expose(serialize = false, deserialize = false)
    private String password;
    @SerializedName("contact")
    @Expose
    private String contact;
    @SerializedName("address")
    @Expose
    private String address;
    @SerializedName("pincode")
    @Expose
    private String pincode;
    @SerializedName("incharge")
    @Expose
    private String incharge;
    @SerializedName("web")
    @Expose
    private String web;
    @SerializedName("total_affected")
    @Expose
    private Integer totalAffected;
    @SerializedName("total_deaths")
    @Expose
    private Integer totalDeaths;
    @SerializedName("total_recovered")
    @Expose
    private Integer totalRecovered;
    @SerializedName("__v")
    @Expose
    private Integer v;

    public HealthCenter() {
    }

    public HealthCenter(String id, String address, String email, String contact, String name, String incharge, String pincode, String web, Integer totalAffected, Integer totalDeaths, Integer totalRecovered) {
        this.id = id;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.name = name;
        this.incharge = incharge;
        this.pincode = pincode;
        this.web = web;
        this.totalAffected = totalAffected;
        this.totalDeaths = totalDeaths;
        this.totalRecovered = totalRecovered;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIncharge() {
        return incharge;
    }

    public void setIncharge(String incharge) {
        this.incharge = incharge;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
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

    public Integer getTotalRecovered() {
        return totalRecovered;
    }

    public void setTotalRecovered(Integer totalRecovered) {
        this.totalRecovered = totalRecovered;
    }

    protected HealthCenter(Parcel in) {
        this.id = ((String) in.readValue((String.class.getClassLoader())));
        this.address = ((String) in.readValue((String.class.getClassLoader())));
        this.email = ((String) in.readValue((String.class.getClassLoader())));
        this.contact = ((String) in.readValue((String.class.getClassLoader())));
        this.name = ((String) in.readValue((String.class.getClassLoader())));
        this.incharge = ((String) in.readValue((String.class.getClassLoader())));
        this.pincode = ((String) in.readValue((String.class.getClassLoader())));
        this.web = ((String) in.readValue((String.class.getClassLoader())));
        this.totalAffected = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.totalDeaths = ((Integer) in.readValue((Integer.class.getClassLoader())));
        this.totalRecovered = ((Integer) in.readValue((Integer.class.getClassLoader())));
    }

    public void writeToParcel(Parcel dest, int flags) {
        dest.writeValue(id);
        dest.writeValue(address);
        dest.writeValue(email);
        dest.writeValue(contact);
        dest.writeValue(name);
        dest.writeValue(incharge);
        dest.writeValue(pincode);
        dest.writeValue(web);
        dest.writeValue(totalAffected);
        dest.writeValue(totalDeaths);
        dest.writeValue(totalRecovered);
    }

    public int describeContents() {
        return 0;
    }

    public static final Creator<HealthCenter> CREATOR = new Creator<HealthCenter>() {
        @Override
        public HealthCenter createFromParcel(Parcel source) {
            return new HealthCenter(source);
        }

        @Override
        public HealthCenter[] newArray(int size) {
            return new HealthCenter[size];
        }
    };
}

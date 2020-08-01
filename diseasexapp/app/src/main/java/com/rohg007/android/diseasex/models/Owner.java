package com.rohg007.android.diseasex.models;

public class Owner {
    private String ownerId;
    private String ownerName;
    private String ownerContactNumber;
    private String ownerEmail;
    private String ownerAddress;
    private String centreId;

    public Owner(String ownerId, String ownerName, String ownerContactNumber, String ownerEmail, String ownerAddress, String centreId) {
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerContactNumber = ownerContactNumber;
        this.ownerEmail = ownerEmail;
        this.ownerAddress = ownerAddress;
        this.centreId = centreId;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerContactNumber() {
        return ownerContactNumber;
    }

    public void setOwnerContactNumber(String ownerContactNumber) {
        this.ownerContactNumber = ownerContactNumber;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public String getOwnerAddress() {
        return ownerAddress;
    }

    public void setOwnerAddress(String ownerAddress) {
        this.ownerAddress = ownerAddress;
    }

    public String getCentreId() {
        return centreId;
    }

    public void setCentreId(String centreId) {
        this.centreId = centreId;
    }
}

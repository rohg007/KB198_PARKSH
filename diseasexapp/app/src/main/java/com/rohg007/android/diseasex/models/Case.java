package com.rohg007.android.diseasex.models;

public class Case {
    private String centerId;
    private String diseaseId;
    private String livestockId;
    private String deadLiving;

    public Case(String centerId, String diseaseId, String livestockId, String deadLiving) {
        this.centerId = centerId;
        this.diseaseId = diseaseId;
        this.livestockId = livestockId;
        this.deadLiving = deadLiving;
    }

    public String getCenterId() {
        return centerId;
    }

    public void setCenterId(String centerId) {
        this.centerId = centerId;
    }

    public String getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(String diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getLivestockId() {
        return livestockId;
    }

    public void setLivestockId(String livestockId) {
        this.livestockId = livestockId;
    }

    public String getDeadLiving() {
        return deadLiving;
    }

    public void setDeadLiving(String deadLiving) {
        this.deadLiving = deadLiving;
    }
}

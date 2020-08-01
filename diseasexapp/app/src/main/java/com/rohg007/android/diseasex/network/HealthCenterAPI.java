package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.HealthCenter;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.GET;

public interface HealthCenterAPI {
    @GET("healthCenters")
    Call<ArrayList<HealthCenter>> getHealthCenterList();
}

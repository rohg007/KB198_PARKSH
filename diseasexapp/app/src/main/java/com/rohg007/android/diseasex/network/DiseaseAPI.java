package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Disease;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.GET;

public interface DiseaseAPI {
    @GET("diseases")
    Call<ArrayList<Disease>> getDiseaseList();
}

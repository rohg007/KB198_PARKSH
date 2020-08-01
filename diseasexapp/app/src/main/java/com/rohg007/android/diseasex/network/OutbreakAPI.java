package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Outbreak;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.GET;

public interface OutbreakAPI {
    @GET("outbreaks")
    Call<ArrayList<Outbreak>> getOutbreaksList();
}

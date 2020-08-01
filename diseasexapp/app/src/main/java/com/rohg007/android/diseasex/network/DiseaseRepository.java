package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Disease;

import java.util.ArrayList;

import androidx.lifecycle.MutableLiveData;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DiseaseRepository {
    private static DiseaseRepository diseaseRepository;
    private DiseaseAPI diseaseAPI;
    public MutableLiveData<Boolean> progressBarObservable = new MutableLiveData<>();

    public static DiseaseRepository getInstance(){
        if(diseaseRepository==null)
            diseaseRepository = new DiseaseRepository();

        return diseaseRepository;
    }

    private DiseaseRepository(){
        progressBarObservable.setValue(true);
        diseaseAPI = RetrofitService.createService(DiseaseAPI.class);
    }

    public MutableLiveData<ArrayList<Disease>> getDiseases(){
        MutableLiveData<ArrayList<Disease>> responseData = new MutableLiveData<>();
        diseaseAPI.getDiseaseList().enqueue(new Callback<ArrayList<Disease>>() {
            @Override
            public void onResponse(Call<ArrayList<Disease>> call, Response<ArrayList<Disease>> response) {
                if(response.isSuccessful()) {
                    progressBarObservable.setValue(false);
                    responseData.setValue(response.body());
                }
            }

            @Override
            public void onFailure(Call<ArrayList<Disease>> call, Throwable t) {
                progressBarObservable.setValue(false);
                responseData.setValue(null);
            }
        });
        return responseData;
    }
}

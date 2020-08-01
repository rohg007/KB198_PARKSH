package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.HealthCenter;

import java.util.ArrayList;

import androidx.lifecycle.MutableLiveData;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class HealthCenterRepository {
    public MutableLiveData<Boolean> progressBarObservable = new MutableLiveData<>();
    private static HealthCenterRepository healthCenterRepository;
    private HealthCenterAPI healthCenterAPI;

    public static HealthCenterRepository getInstance(){
        if(healthCenterRepository==null)
            healthCenterRepository = new HealthCenterRepository();
        return healthCenterRepository;
    }

    private HealthCenterRepository(){
        progressBarObservable.setValue(true);
        healthCenterAPI = RetrofitService.createService(HealthCenterAPI.class);
    }

    public MutableLiveData<ArrayList<HealthCenter>> getHealthCenters(){
        MutableLiveData<ArrayList<HealthCenter>> responseData = new MutableLiveData<>();
        healthCenterAPI.getHealthCenterList().enqueue(new Callback<ArrayList<HealthCenter>>() {
            @Override
            public void onResponse(Call<ArrayList<HealthCenter>> call, Response<ArrayList<HealthCenter>> response) {
                if(response.isSuccessful()) {
                    progressBarObservable.setValue(false);
                    responseData.setValue(response.body());
                }
            }

            @Override
            public void onFailure(Call<ArrayList<HealthCenter>> call, Throwable t) {
                progressBarObservable.setValue(false);
                responseData.setValue(null);
            }
        });
        return responseData;
    }
}

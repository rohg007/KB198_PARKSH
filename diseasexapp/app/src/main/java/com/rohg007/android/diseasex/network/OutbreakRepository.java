package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.Outbreak;

import java.util.ArrayList;

import androidx.lifecycle.MutableLiveData;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OutbreakRepository {
    private static OutbreakRepository outbreakRepository;
    private OutbreakAPI outbreakAPI;
    public MutableLiveData<Boolean> progressBarObservable = new MutableLiveData<>();

    public static OutbreakRepository getInstance(){
        if(outbreakRepository==null)
            outbreakRepository = new OutbreakRepository();

        return outbreakRepository;
    }

    private OutbreakRepository(){
        outbreakAPI = RetrofitService.createService(OutbreakAPI.class);
        progressBarObservable.setValue(true);
    }

    public MutableLiveData<ArrayList<Outbreak>> getOutbreaks(){
        MutableLiveData<ArrayList<Outbreak>> responseData = new MutableLiveData<>();
        outbreakAPI.getOutbreaksList().enqueue(new Callback<ArrayList<Outbreak>>() {
            @Override
            public void onResponse(Call<ArrayList<Outbreak>> call, Response<ArrayList<Outbreak>> response) {
                if(response.isSuccessful()) {
                    progressBarObservable.setValue(false);
                    responseData.setValue(response.body());
                }
            }

            @Override
            public void onFailure(Call<ArrayList<Outbreak>> call, Throwable t) {
                progressBarObservable.setValue(false);
                responseData.setValue(null);
            }
        });
        return responseData;
    }

}

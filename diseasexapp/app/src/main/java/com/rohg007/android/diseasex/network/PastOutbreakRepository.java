package com.rohg007.android.diseasex.network;

import com.rohg007.android.diseasex.models.Outbreak;

import java.util.ArrayList;

import androidx.lifecycle.MutableLiveData;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PastOutbreakRepository {
    private static PastOutbreakRepository outbreakRepository;
    private PastOutbreakAPI outbreakAPI;
    public MutableLiveData<Boolean> progressBarObservable = new MutableLiveData<>();

    public static PastOutbreakRepository getInstance(){
        if(outbreakRepository==null)
            outbreakRepository = new PastOutbreakRepository();

        return outbreakRepository;
    }

    private PastOutbreakRepository(){
        outbreakAPI = RetrofitService.createService(PastOutbreakAPI.class);
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

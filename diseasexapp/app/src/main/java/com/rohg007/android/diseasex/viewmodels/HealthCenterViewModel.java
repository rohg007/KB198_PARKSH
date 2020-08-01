package com.rohg007.android.diseasex.viewmodels;

import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.HealthCenter;
import com.rohg007.android.diseasex.network.DiseaseRepository;
import com.rohg007.android.diseasex.network.HealthCenterRepository;

import java.util.ArrayList;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class HealthCenterViewModel extends ViewModel {
    private MutableLiveData<ArrayList<HealthCenter>> healthCenterMutableLiveData;
    private HealthCenterRepository healthCenterRepository;
    private MutableLiveData<Boolean> progressObservable;

    public void init(){
        if(healthCenterMutableLiveData!=null) return;
        healthCenterRepository = HealthCenterRepository.getInstance();
        healthCenterMutableLiveData = healthCenterRepository.getHealthCenters();
        progressObservable = healthCenterRepository.progressBarObservable;
    }

    public void recall(){
        healthCenterMutableLiveData = healthCenterRepository.getHealthCenters();
        progressObservable = healthCenterRepository.progressBarObservable;
    }

    public LiveData<ArrayList<HealthCenter>> getDiseaseRepository(){return healthCenterMutableLiveData;}

    public LiveData<Boolean> getProgressBar(){return progressObservable;}
}

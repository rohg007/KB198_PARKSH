package com.rohg007.android.diseasex.viewmodels;

import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.network.DiseaseRepository;

import java.util.ArrayList;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class DiseaseViewModel extends ViewModel {
    private MutableLiveData<ArrayList<Disease>> diseaseMutableLiveData;
    private DiseaseRepository diseaseRepository;
    private MutableLiveData<Boolean> progressObservable;

    public void init(){
        if(diseaseMutableLiveData!=null) return;
        diseaseRepository = DiseaseRepository.getInstance();
        diseaseMutableLiveData = diseaseRepository.getDiseases();
        progressObservable = diseaseRepository.progressBarObservable;
    }

    public void recall(){
        diseaseMutableLiveData = diseaseRepository.getDiseases();
        progressObservable = diseaseRepository.progressBarObservable;
    }

    public LiveData<ArrayList<Disease>> getDiseaseRepository(){return diseaseMutableLiveData;}

    public LiveData<Boolean> getProgressBar(){return progressObservable;}
}

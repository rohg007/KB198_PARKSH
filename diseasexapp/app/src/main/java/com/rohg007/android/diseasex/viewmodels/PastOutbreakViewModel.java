package com.rohg007.android.diseasex.viewmodels;

import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.network.OutbreakRepository;
import com.rohg007.android.diseasex.network.PastOutbreakRepository;

import java.util.ArrayList;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class PastOutbreakViewModel extends ViewModel {
    private MutableLiveData<ArrayList<Outbreak>> outbreakMutableLiveData;
    private PastOutbreakRepository outbreakRepository;
    private MutableLiveData<Boolean> progressBarObservable;

    public void init(){
        if(outbreakMutableLiveData!=null) return;
        outbreakRepository = PastOutbreakRepository.getInstance();
        outbreakMutableLiveData = outbreakRepository.getOutbreaks();
        progressBarObservable = outbreakRepository.progressBarObservable;
    }
    public void recall(){
        outbreakMutableLiveData = outbreakRepository.getOutbreaks();
        progressBarObservable = outbreakRepository.progressBarObservable;
    }

    public LiveData<ArrayList<Outbreak>> getOutbreakRepository(){return outbreakMutableLiveData;}

    public LiveData<Boolean> getProgressBar(){return progressBarObservable;}
}

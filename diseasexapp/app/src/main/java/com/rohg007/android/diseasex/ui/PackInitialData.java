package com.rohg007.android.diseasex.ui;

import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.Outbreak;

import java.util.ArrayList;

public interface PackInitialData {
    void communicate(ArrayList<Outbreak> outbreaks);
    void passDisease(ArrayList<Disease> diseases);
}

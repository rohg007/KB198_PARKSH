package com.rohg007.android.diseasex.adapters;

import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextClock;
import android.widget.TextView;

import com.rohg007.android.diseasex.R;

import org.w3c.dom.Text;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class DiseaseAdapterViewHolder extends RecyclerView.ViewHolder {

    TextView diseaseTitle;
    TextView diseaseScientificName;
    ProgressBar morbidityBar;
    ProgressBar mortalityBar;
    TextView morbidityPercentage;
    TextView mortalityPercentage;

    public DiseaseAdapterViewHolder(@NonNull View itemView) {
        super(itemView);
        diseaseTitle = itemView.findViewById(R.id.disease_title);
        diseaseScientificName = itemView.findViewById(R.id.disease_scientific_title);
        morbidityBar = itemView.findViewById(R.id.morbidity_indicator);
        mortalityBar =  itemView.findViewById(R.id.mortality_indicator);
        morbidityPercentage = itemView.findViewById(R.id.morbidity_percent);
        mortalityPercentage = itemView.findViewById(R.id.mortality_percent);
    }
}

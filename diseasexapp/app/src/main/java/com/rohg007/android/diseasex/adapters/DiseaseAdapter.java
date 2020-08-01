package com.rohg007.android.diseasex.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.ui.DiseaseDetailActivity;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class DiseaseAdapter extends RecyclerView.Adapter<DiseaseAdapterViewHolder> {
    private ArrayList<Disease> diseaseArrayList;

    public DiseaseAdapter(ArrayList<Disease> diseaseArrayList) {
        this.diseaseArrayList = diseaseArrayList;
    }

    @NonNull
    @Override
    public DiseaseAdapterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.disease_list_item,parent,false);
        return new DiseaseAdapterViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull DiseaseAdapterViewHolder holder, int position) {
        Disease disease = diseaseArrayList.get(position);
        holder.itemView.setOnClickListener(v -> {
            Context context = v.getContext();
            Intent i = new Intent(context, DiseaseDetailActivity.class);
            i.putExtra("DISEASE", disease);
            context.startActivity(i);
        });
        holder.diseaseTitle.setText(disease.getName());
        holder.diseaseScientificName.setText(disease.getScientificName());
        holder.morbidityBar.setProgress(disease.getMorbidity());
        holder.mortalityBar.setProgress(disease.getMortality());
        holder.morbidityPercentage.setText(disease.getMorbidity().toString().concat("%"));
        holder.mortalityPercentage.setText(disease.getMortality().toString().concat("%"));
    }

    @Override
    public int getItemCount() {
        return diseaseArrayList.size();
    }
}

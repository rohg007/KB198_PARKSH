package com.rohg007.android.diseasex.adapters;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.utils.Pair;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class DiagnosisResultAdapter extends RecyclerView.Adapter<DiagnosisResultAdapter.DiagnosisResultsViewHolder> {

    private ArrayList<Pair> results = new ArrayList<>();

    public DiagnosisResultAdapter(ArrayList<Pair> results) {
        this.results = results;
    }

    @NonNull
    @Override
    public DiagnosisResultsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.diagnose_result_list_item, parent, false);
        return new DiagnosisResultsViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull DiagnosisResultsViewHolder holder, int position) {
        Pair p = results.get(position);
        holder.diseaseNameTv.setText(p.first);
        holder.matchPercentageTv.setText(Double.toString(p.second));
        if(p.second<=25.0)
            holder.matchPercentageTv.setTextColor(Color.rgb(0,153,0));
        else if(p.second>25.0 && p.second<=50.0)
            holder.matchPercentageTv.setTextColor(Color.rgb(255,204,0));
        else
            holder.matchPercentageTv.setTextColor(Color.rgb(204,0,0));
    }

    @Override
    public int getItemCount() {
        return results.size();
    }

    public class DiagnosisResultsViewHolder extends RecyclerView.ViewHolder{
        TextView diseaseNameTv;
        TextView matchPercentageTv;

        public DiagnosisResultsViewHolder(@NonNull View itemView) {
            super(itemView);
            diseaseNameTv = itemView.findViewById(R.id.disease_name_diagnosis_result);
            matchPercentageTv = itemView.findViewById(R.id.match_percent_tv);
        }
    }
}

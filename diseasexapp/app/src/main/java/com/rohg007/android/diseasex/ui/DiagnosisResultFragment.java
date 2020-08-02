package com.rohg007.android.diseasex.ui;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.adapters.DiagnosisResultAdapter;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.utils.Pair;

import org.w3c.dom.Text;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.DialogFragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class DiagnosisResultFragment extends DialogFragment {

    public static final String TAG = "diagnosis_result_fragment";
    private ArrayList<String> diagnosis = new ArrayList<>();
    private ArrayList<Disease> diseases = new ArrayList<>();
    public DiagnosisResultFragment() {
    }

    public DiagnosisResultFragment(ArrayList<String> diagnosis, ArrayList<Disease> diseases) {
        this.diagnosis = diagnosis;
        this.diseases = diseases;
    }

    @SuppressLint("SetTextI18n")
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.diagnose_result_fragment, container);
        Log.e("Result Frag: ", diagnosis.size() +" "+ diseases.size());
        ArrayList<Pair> res = match();
        CardView highRiskCardView = v.findViewById(R.id.diagnosis_card_high_risk);
        CardView moderateRiskCardView = v.findViewById(R.id.diagnosis_card_moderate_risk);
        CardView littleRiskCardView = v.findViewById(R.id.diagnosis_card_little_risk);
        TextView riskAlertTextView = v.findViewById(R.id.risk_alert_tv);
        Button cancelButton = v.findViewById(R.id.diagnose_result_cancel);
        cancelButton.setOnClickListener(v1 -> {
            dismiss();
        });
        if(res.isEmpty()){
            littleRiskCardView.setVisibility(View.VISIBLE);
            moderateRiskCardView.setVisibility(View.GONE);
            highRiskCardView.setVisibility(View.GONE);
            riskAlertTextView.setVisibility(View.GONE);
        } else if(res.get(0).second<=25.0){
            littleRiskCardView.setVisibility(View.VISIBLE);
            moderateRiskCardView.setVisibility(View.GONE);
            highRiskCardView.setVisibility(View.GONE);
            riskAlertTextView.setVisibility(View.GONE);
        } else if(res.get(0).second>25.0 && res.get(0).second<=50.0){
            moderateRiskCardView.setVisibility(View.VISIBLE);
            littleRiskCardView.setVisibility(View.GONE);
            highRiskCardView.setVisibility(View.GONE);
            riskAlertTextView.setVisibility(View.GONE);
        }
        RecyclerView recyclerView = v.findViewById(R.id.diagnose_result_rv);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        DiagnosisResultAdapter adapter = new DiagnosisResultAdapter(res);
        recyclerView.setAdapter(adapter);
        adapter.notifyDataSetChanged();
        return v;
    }

    @Override
    public void onStart() {
        super.onStart();
        int width = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setLayout(width,height);
    }

    private ArrayList<Pair> match() {
        ArrayList<Pair> res = new ArrayList<>();
        HashMap<String, Double> map = new HashMap<>();
        for (int i = 0; i < diseases.size(); i++) {
            String[] symptoms = diseases.get(i).getSymptoms().split(",");
            HashSet<String> set = new HashSet<>();
            for (int j = 0; j < symptoms.length; j++) {
                set.add(symptoms[j].toLowerCase());
            }
            int count = 0;
            for (int j = 0; j < diagnosis.size(); j++) {
                if (set.contains(diagnosis.get(j)))
                    ++count;
            }
            double per = (((double) count) * 100) / (double) symptoms.length;
            per = round(per,2);
            map.put(diseases.get(i).getName(), per);
        }
        List<Map.Entry<String, Double>> list =
                new LinkedList<Map.Entry<String, Double>>(map.entrySet());
        Collections.sort(list, new Comparator<Map.Entry<String, Double>>() {
            public int compare(Map.Entry<String, Double> o1,
                               Map.Entry<String, Double> o2) {
                return (o1.getValue()).compareTo(o2.getValue());
            }
        });
        for (Map.Entry<String, Double> aa : list) {
            if(aa.getValue()>0.0)
                res.add(new Pair(aa.getKey(), aa.getValue()));
        }
        Collections.reverse(res);
        return res;
    }

    private double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}

package com.rohg007.android.diseasex.ui;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Disease;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

public class DiagnosisQuestionFragment extends DialogFragment {
    public static final String TAG = "diagnosis_question_fragment";
    private ArrayList<Disease> diseases = new ArrayList<>();

    public DiagnosisQuestionFragment() {
    }

    public DiagnosisQuestionFragment(ArrayList<Disease> diseases) {
        this.diseases = diseases;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.diagnose_question_fragment,container);
        ArrayList<String> checked = new ArrayList<>();
        CheckBox swellingAnkleCheckbox = v.findViewById(R.id.swelling_ankle_checkbox);
        CheckBox indigestionCheckbox = v.findViewById(R.id.ingestion_checkbox);
        CheckBox constipationCheckbox = v.findViewById(R.id.constipation_checkbox);
        CheckBox nosiaCheckbox = v.findViewById(R.id.nosia_checkbox);
        CheckBox bodyDullnessCheckbox = v.findViewById(R.id.body_dullness_checkbox);
        CheckBox skinReddeningCheckbox = v.findViewById(R.id.skin_redning_checkbox);
        CheckBox feverCheckbox = v.findViewById(R.id.fever_checkbox);
        CheckBox darkLegCheckbox = v.findViewById(R.id.dark_leg_checkbox);
        CheckBox painfulLegCheckbox = v.findViewById(R.id.painful_legs_checkbox);
        CheckBox nonFertileCheckbox = v.findViewById(R.id.non_fertile_checkbox);
        CheckBox reproductiveFailureCheckbox = v.findViewById(R.id.reproductive_parts_checkbox);
        CheckBox skinWhiteningCheckbox = v.findViewById(R.id.skin_whitening_checkbox);
        CheckBox lackOfBloodCheckbox = v.findViewById(R.id.lack_of_blood_checkbox);
        CheckBox spotsOnSkinCheckbox = v.findViewById(R.id.spots_on_skin);
        CheckBox smallSpotsCheckbox = v.findViewById(R.id.small_spots_checkbox);
        CheckBox weaknessCheckbox = v.findViewById(R.id.weakness_checkbox);
        CheckBox lackOfAppetiteCheckbox = v.findViewById(R.id.lack_of_appetite_checkbox);
        CheckBox breakInSkinCheckbox = v.findViewById(R.id.break_in_skin_checkbox);
        CheckBox abdominalPainCheckbox = v.findViewById(R.id.abdominal_pain_checkbox);
        CheckBox vomittingBloodCheckbox = v.findViewById(R.id.vomiting_blood_checkbox);
        CheckBox diarrheaCheckbox = v.findViewById(R.id.diarrhea_checkbox);
        CheckBox headacheCheckbox = v.findViewById(R.id.headache_checkbox);

        Button cancelButton = v.findViewById(R.id.cancel_diagnose);
        cancelButton.setOnClickListener(v12 -> {
            dismiss();
        });

        Button diagnoseButton = v.findViewById(R.id.diagnose_button);
        diagnoseButton.setOnClickListener(v1 -> {
            if(swellingAnkleCheckbox.isChecked())
                checked.add("swelling of ankle");
            if(indigestionCheckbox.isChecked())
                checked.add("indigestion");
            if(constipationCheckbox.isChecked())
                checked.add("constipation");
            if(nosiaCheckbox.isChecked()) {
                checked.add("nosia");
                checked.add("nausea");
            }
            if(bodyDullnessCheckbox.isChecked())
                checked.add("body dullness");
            if(skinReddeningCheckbox.isChecked())
                checked.add("skin redning");
            if(feverCheckbox.isChecked()) {
                checked.add("fever");
                checked.add("high fever");
            }
            if(darkLegCheckbox.isChecked())
                checked.add("dark leg");
            if(painfulLegCheckbox.isChecked()){
                checked.add("painful movement of legs");
            }
            if(nonFertileCheckbox.isChecked())
                checked.add("non-fertile");
            if(reproductiveFailureCheckbox.isChecked())
                checked.add("reproductive parts failure");
            if(skinWhiteningCheckbox.isChecked())
                checked.add("skin whitening");
            if(lackOfBloodCheckbox.isChecked())
                checked.add("lack of blood");
            if(spotsOnSkinCheckbox.isChecked())
                checked.add("spots on skin");
            if(smallSpotsCheckbox.isChecked()){
                checked.add("small pots on whole body");
            }
            if(weaknessCheckbox.isChecked())
                checked.add("weakness");
            if(lackOfAppetiteCheckbox.isChecked())
                checked.add("lack of appetite");
            if(breakInSkinCheckbox.isChecked())
                checked.add("break in skin");
            if(abdominalPainCheckbox.isChecked())
                checked.add("abdominal pain");
            if(vomittingBloodCheckbox.isChecked())
                checked.add("vomitting of blood");
            if(diarrheaCheckbox.isChecked()) {
                checked.add("diarrhea");
                checked.add("severe diarrhea");
            }
            if(headacheCheckbox.isChecked()){
                checked.add("headache");
                checked.add("severe headache");
            }
            DiagnosisResultFragment diagnosisResultFragment = new DiagnosisResultFragment();
            FragmentManager fragmentManager = getFragmentManager();
            fragmentManager.beginTransaction().add(new DiagnosisResultFragment(checked, diseases), DiagnosisResultFragment.TAG).commit();
            dismiss();
        });
        return v;
    }

    @Override
    public void onStart() {
        super.onStart();
        int width = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setLayout(width,height);
    }
}

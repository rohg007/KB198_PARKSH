package com.rohg007.android.diseasex.ui;


import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.material.bottomsheet.BottomSheetDialogFragment;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.HealthCenter;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.utils.Formatters;

import org.w3c.dom.Text;

import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class CenterDetailSheet extends BottomSheetDialogFragment {

    private Outbreak outbreak;

    public CenterDetailSheet() {
        // Required empty public constructor
    }

    public CenterDetailSheet(Outbreak outbreak){
        this.outbreak= outbreak;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_center_detail_sheet, container, false);
        TextView diseaseNameTv = v.findViewById(R.id.disease_name_sheet);
        TextView centerNameTv = v.findViewById(R.id.center_name);
        TextView centerInchargeTv = v.findViewById(R.id.center_incharge);
        TextView centerAreaTv = v.findViewById(R.id.center_area);
        TextView centerEmailTv = v.findViewById(R.id.center_email);
        TextView precautionsTv = v.findViewById(R.id.precautions_sheet);
        TextView symptomsTv = v.findViewById(R.id.symptoms_sheet);
        Button centerCallButton = v.findViewById(R.id.center_call);
        TextView outbreakTv = v.findViewById(R.id.outbreak_tv);
        TextView precautionLivestockTv = v.findViewById(R.id.sheet_precautions_livestock);
        TextView symptomsVaccinationTv = v.findViewById(R.id.sheet_symptoms_vaccinations);

        if(outbreak.getFlag()){
            outbreakTv.setText(R.string.animal_outbreak);
        } else {
            outbreakTv.setText(R.string.human_outbreak);
        }
        diseaseNameTv.setText(outbreak.getDisease().getName());
        centerNameTv.setText(outbreak.getHealthCenter().getName());
        centerInchargeTv.setText(outbreak.getHealthCenter().getIncharge());
        Geocoder geocoder = new Geocoder(getActivity());
        List<Address> addresses = new ArrayList<>();
        try {
            addresses = geocoder.getFromLocation(outbreak.getLatlng().latitude,outbreak.getLatlng().longitude,1);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(!addresses.isEmpty()) {
            int n = addresses.get(0).getMaxAddressLineIndex();
            Log.e("Center Detail Sheet",Integer.toString(n));
            StringBuilder s = new StringBuilder();
            for(int i=0;i<=n;i++){
                s.append(addresses.get(0).getAddressLine(i));
            }
            centerAreaTv.setText(s);
        }
        else
            centerAreaTv.setText(outbreak.getHealthCenter().getAddress());
        centerEmailTv.setText(outbreak.getHealthCenter().getEmail());

        if(outbreak.getFlag()){
            precautionLivestockTv.setText(R.string.livestock_affected);
            int n = outbreak.getDisease().getLivestock().size();
            String[] livestocks = new String[n];
            for(int i=0;i<n;i++)
                livestocks[i] = outbreak.getDisease().getLivestock().get(i).getBreed();
            String formattedLivestock = Formatters.bulletedString(livestocks);
            precautionsTv.setText(Html.fromHtml(formattedLivestock));
        } else {
            String[] precautions = outbreak.getDisease().getPrecautions().split(",");
            String formattedPrecautions = Formatters.bulletedString(precautions);
            precautionsTv.setText(Html.fromHtml(formattedPrecautions));
        }

        if(outbreak.getFlag()){
            symptomsVaccinationTv.setText(R.string.vaccinations);
            int n = outbreak.getDisease().getVaccine().size();
            String[] vaccines = new String[n];
            for(int i=0;i<n;i++)
                vaccines[i] = outbreak.getDisease().getVaccine().get(i).getName()+" "+outbreak.getDisease().getVaccine().get(i).getDuration()+"Days";
            String formattedVaccines = Formatters.bulletedString(vaccines);
            symptomsTv.setText(Html.fromHtml(formattedVaccines));
        } else {
            String[] symptoms = outbreak.getDisease().getSymptoms().split(",");
            String formattedSymptoms = Formatters.bulletedString(symptoms);
            symptomsTv.setText(Html.fromHtml(formattedSymptoms));
        }

        centerCallButton.setOnClickListener(v1 -> {
            String number = outbreak.getHealthCenter().getContact();
            Uri call = Uri.parse("tel:" + number);
            Intent intent = new Intent(Intent.ACTION_DIAL,call);
            startActivity(intent);
        });
        return v;
    }
}

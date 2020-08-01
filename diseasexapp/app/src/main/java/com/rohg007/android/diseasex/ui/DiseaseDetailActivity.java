package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.Html;
import android.view.MenuItem;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.utils.Formatters;

public class DiseaseDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_disease_detail);

        if(getSupportActionBar()!=null){
            getSupportActionBar().setTitle("Disease Details");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        Bundle bundle = getIntent().getExtras();
        Disease disease = bundle.getParcelable("DISEASE");

        TextView diseaseNameTv = findViewById(R.id.disease_name_tv);
        TextView scientificNameTv = findViewById(R.id.scientific_name_tv);
        TextView morbidityPercentage = findViewById(R.id.morbidity_percentage);
        TextView mortalityPercentage = findViewById(R.id.mortality_percentage);
        ProgressBar morbidityIndicator = findViewById(R.id.detail_morbidity_indicator);
        ProgressBar mortalityIndicator = findViewById(R.id.detail_mortality_indicator);
        TextView populationAffectedTv = findViewById(R.id.population_affected_tv);
        TextView populationDeathsTv = findViewById(R.id.population_death_tv);
        TextView symptomsTv = findViewById(R.id.symptoms_tv);
        TextView precautionsTv = findViewById(R.id.precautions_tv);

        diseaseNameTv.setText(disease.getName());
        scientificNameTv.setText(disease.getScientificName());
        morbidityPercentage.setText(disease.getMorbidity().toString().concat("%"));
        mortalityPercentage.setText(disease.getMortality().toString().concat("%"));
        morbidityIndicator.setProgress(disease.getMorbidity());
        mortalityIndicator.setProgress(disease.getMortality());
        populationAffectedTv.setText(disease.getTotalAffected().toString());
        populationDeathsTv.setText(disease.getTotalDeaths().toString());

        String[] symptoms = disease.getSymptoms().split(",");
        String formattedSymptoms = Formatters.bulletedString(symptoms);
        symptomsTv.setText(Html.fromHtml(formattedSymptoms));

        String[] precautions = disease.getPrecautions().split(",");
        String formattedPrecautions = Formatters.bulletedString(precautions);
        precautionsTv.setText(Html.fromHtml(formattedPrecautions));
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case android.R.id.home:
                onBackPressed();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
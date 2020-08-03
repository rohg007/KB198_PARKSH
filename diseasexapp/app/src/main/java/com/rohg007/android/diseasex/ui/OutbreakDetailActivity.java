package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.text.Html;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.MarkerOptions;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.utils.Formatters;

public class OutbreakDetailActivity extends AppCompatActivity implements OnMapReadyCallback {

    MapView mapView;
    private GoogleMap googleMap;
    private Outbreak outbreak;
    TextView centerNameContent;
    TextView centerAddressContent;
    TextView centerInchargeContent;
    TextView affectedContent;
    TextView deathsContent;
    TextView recoveredContent;
    TextView symptomsLivestockTv;
    TextView precautionsVaccinationTv;
    Button webContentButton;
    Button phoneContentButton;
    Button emailContentButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_outbreak_detail);

        if(getSupportActionBar()!=null){
            getSupportActionBar().hide();
        }

        Bundle bundle = getIntent().getExtras();
        outbreak = bundle.getParcelable("OUTBREAK");
        Location location = getIntent().getParcelableExtra("LOCATION");
        TextView diseaseNameTv = findViewById(R.id.disease_name_outbreak_detail);
        TextView scientificNameTv = findViewById(R.id.scientific_name_outbreak_detail);
        TextView morbidityTv = findViewById(R.id.morbidity_outbreak_detail);
        TextView mortalityTv = findViewById(R.id.mortality_outbreak_detail);
        TextView symptomsTv = findViewById(R.id.symptoms_detail_tv);
        TextView precautionsTv = findViewById(R.id.precautions_detail_tv);
        centerNameContent = findViewById(R.id.health_center_name_content);
        centerAddressContent = findViewById(R.id.address_content_tv);
        centerInchargeContent = findViewById(R.id.incharge_content_tv);
        affectedContent = findViewById(R.id.affected_content_tv);
        deathsContent = findViewById(R.id.deaths_content_tv);
        recoveredContent = findViewById(R.id.recovered_content_tv);
        webContentButton = findViewById(R.id.check_web_content_button);
        phoneContentButton = findViewById(R.id.call_content_button);
        emailContentButton = findViewById(R.id.email_content_button);
        mapView = findViewById(R.id.outbreak_detail_map);
        symptomsLivestockTv = findViewById(R.id.symptomsLivestockTv);
        precautionsVaccinationTv = findViewById(R.id.precautionsVaccineTv);
        TextView distTv = findViewById(R.id.cur_dist_tv);

        centerNameContent.setTextSize(16);
        symptomsTv.setTextSize(16);
        precautionsTv.setTextSize(16);
        if(mapView!=null){
            mapView.onCreate(null);
            mapView.getMapAsync(this);
        }

        diseaseNameTv.setText(outbreak.getDisease().getName());
        scientificNameTv.setText(outbreak.getDisease().getScientificName());
        morbidityTv.setText(outbreak.getDisease().getMorbidity().toString().concat("%"));
        mortalityTv.setText(outbreak.getDisease().getMortality().toString().concat("%"));
        String s = outbreak.getHealthCenter().getAddress()+" "+outbreak.getHealthCenter().getPincode();
        centerNameContent.setText(outbreak.getHealthCenter().getName());
        centerAddressContent.setText(s);
        centerInchargeContent.setText(outbreak.getHealthCenter().getIncharge());
        if(outbreak.getHealthCenter().getTotalAffected()!=null)
            affectedContent.setText(outbreak.getHealthCenter().getTotalAffected().toString());
        if(outbreak.getHealthCenter().getTotalDeaths()!=null)
            deathsContent.setText(outbreak.getHealthCenter().getTotalDeaths().toString());
        if(outbreak.getHealthCenter().getTotalRecovered()!=null)
            recoveredContent.setText(outbreak.getHealthCenter().getTotalRecovered().toString());

        webContentButton.setOnClickListener(v -> {
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setData(Uri.parse("https://"+outbreak.getHealthCenter().getWeb()));
            startActivity(i);
        });

        phoneContentButton.setOnClickListener(v -> {
            Intent i = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:"+outbreak.getHealthCenter().getContact()));
            startActivity(i);
        });

        emailContentButton.setOnClickListener(v -> {
            Intent i = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"+outbreak.getHealthCenter().getEmail()));
            startActivity(i);
        });

        if(outbreak.getFlag()){
            symptomsLivestockTv.setText(R.string.livestock_affected);
            int n = outbreak.getDisease().getLivestock().size();
            String[] livestocks = new String[n];
            for(int i=0;i<n;i++)
                livestocks[i] = outbreak.getDisease().getLivestock().get(i).getBreed();
            String formattedLivestock = Formatters.bulletedString(livestocks);
            symptomsTv.setText(Html.fromHtml(formattedLivestock));
        } else {
            String[] precautions = outbreak.getDisease().getPrecautions().split(",");
            String formattedPrecautions = Formatters.bulletedString(precautions);
            precautionsTv.setText(Html.fromHtml(formattedPrecautions));
        }

        if(outbreak.getFlag()){
            precautionsVaccinationTv.setText(R.string.vaccinations);
            int n = outbreak.getDisease().getVaccine().size();
            String[] vaccines = new String[n];
            for(int i=0;i<n;i++)
                vaccines[i] = outbreak.getDisease().getVaccine().get(i).getName()+", vaccination duration within "+outbreak.getDisease().getVaccine().get(i).getDuration()+" Days";
            String formattedVaccines = Formatters.bulletedString(vaccines);
            precautionsTv.setText(Html.fromHtml(formattedVaccines));
        } else {
            String[] symptoms = outbreak.getDisease().getSymptoms().split(",");
            String formattedSymptoms = Formatters.bulletedString(symptoms);
            symptomsTv.setText(Html.fromHtml(formattedSymptoms));
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        MapsInitializer.initialize(this);
        this.googleMap = googleMap;
        setMapLocation();
    }

    private void setMapLocation(){
        googleMap.addMarker(new MarkerOptions().position(outbreak.getLatlng()).title("Outbreak Center is Here"));
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(outbreak.getLatlng(),13f));
    }
}
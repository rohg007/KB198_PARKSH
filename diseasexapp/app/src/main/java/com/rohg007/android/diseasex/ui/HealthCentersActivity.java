package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;

import com.ramotion.foldingcell.FoldingCell;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.adapters.HealthCenterAdapter;
import com.rohg007.android.diseasex.models.HealthCenter;
import com.rohg007.android.diseasex.viewmodels.HealthCenterViewModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Map;

public class HealthCentersActivity extends AppCompatActivity {

    private HealthCenterAdapter healthCenterAdapter;
    private ArrayList<HealthCenter> healthCenterArrayList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_health_centers);

        if(getSupportActionBar()!=null) {
            getSupportActionBar().setTitle("Health Centers");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        Location location = getIntent().getParcelableExtra("LOCATION");

        HealthCenterViewModel healthCenterViewModel = ViewModelProviders.of(this).get(HealthCenterViewModel.class);
        healthCenterViewModel.init();

        ProgressBar progressBar = findViewById(R.id.health_centers_pb);
        RecyclerView recyclerView = findViewById(R.id.health_center_rv);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        Collections.sort(healthCenterArrayList, new Comparator<HealthCenter>() {
            public int compare(HealthCenter o1,
                               HealthCenter o2) {
                Location temp = new Location(LocationManager.GPS_PROVIDER);
                temp.setLatitude(o1.getLatlng().latitude);
                temp.setLongitude(o1.getLatlng().longitude);
                Location temp1 = new Location(LocationManager.GPS_PROVIDER);
                temp.setLatitude(o2.getLatlng().latitude);
                temp.setLongitude(o2.getLatlng().longitude);
                float dist = location.distanceTo(temp);
                float dist1 = location.distanceTo(temp1);
                if(dist<dist1)
                    return 1;
                else if(dist>dist1)
                    return -1;
                else
                    return 0;
            }
        });
        healthCenterAdapter = new HealthCenterAdapter(this, healthCenterArrayList, location);
        recyclerView.setAdapter(healthCenterAdapter);

        healthCenterViewModel.getDiseaseRepository().observe(this, responseData ->{
            healthCenterArrayList.addAll(responseData);
            healthCenterAdapter.notifyDataSetChanged();
        });

        healthCenterViewModel.getProgressBar().observe(this, progress -> {
            if(progress)
                progressBar.setVisibility(View.VISIBLE);
            else
                progressBar.setVisibility(View.GONE);
        });
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
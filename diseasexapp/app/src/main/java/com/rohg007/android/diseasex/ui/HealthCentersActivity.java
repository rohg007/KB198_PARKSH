package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;

import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;
import com.ramotion.foldingcell.FoldingCell;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.adapters.HealthCenterAdapter;
import com.rohg007.android.diseasex.models.HealthCenter;
import com.rohg007.android.diseasex.viewmodels.HealthCenterViewModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

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
        healthCenterAdapter = new HealthCenterAdapter(this, healthCenterArrayList, location);
        recyclerView.setAdapter(healthCenterAdapter);


        ExtendedFloatingActionButton fab = findViewById(R.id.nearest_health_centers);
        fab.setOnClickListener(v -> {
            String uri = "geo:"+location.getLatitude()+","+location.getLongitude()+"?q=hospitals";
//            String uri = "geo:"+healthCenter.getLatlng().latitude+","+healthCenter.getLatlng().longitude;
            Uri gmmIntentUri = Uri.parse(uri);
            Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
            mapIntent.setPackage("com.google.android.apps.maps");
            startActivity(mapIntent);
        });

        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener(){
            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy){
                if (dy > 0)
                    fab.shrink();
                else if (dy < 0)
                    fab.extend();
            }
        });

        healthCenterViewModel.getDiseaseRepository().observe(this, responseData ->{
            TreeMap<Double, HealthCenter> map = getSortedList(location, responseData);
            for(Map.Entry<Double, HealthCenter> e : map.entrySet()){
                healthCenterArrayList.add(e.getValue());
            }
            healthCenterAdapter.notifyDataSetChanged();
        });

        healthCenterViewModel.getProgressBar().observe(this, progress -> {
            if(progress)
                progressBar.setVisibility(View.VISIBLE);
            else
                progressBar.setVisibility(View.GONE);
        });
    }

    private TreeMap<Double, HealthCenter> getSortedList(Location location, ArrayList<HealthCenter> responseData) {
        TreeMap<Double, HealthCenter> map = new TreeMap<>();
        for(HealthCenter h : responseData){
            Location temp = new Location(LocationManager.GPS_PROVIDER);
            temp.setLatitude(h.getLatlng().latitude);
            temp.setLongitude(h.getLatlng().longitude);
            double dist = location.distanceTo(temp);
            map.put(dist, h);
        }
        return map;
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
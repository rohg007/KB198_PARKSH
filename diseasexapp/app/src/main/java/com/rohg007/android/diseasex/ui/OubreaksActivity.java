package com.rohg007.android.diseasex.ui;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import android.location.Location;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;

import com.google.android.gms.maps.GoogleMap;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.adapters.OutbreakAdapter;
import com.rohg007.android.diseasex.models.NamedLocations;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.viewmodels.OutbreakViewModel;

import java.util.ArrayList;

public class OubreaksActivity extends AppCompatActivity {

    private ArrayList<Outbreak> outbreaks = new ArrayList<>();
    private OutbreakViewModel outbreakViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_oubreaks);
        
        if(getSupportActionBar()!=null){
            getSupportActionBar().setTitle("Outbreaks");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        Location location = getIntent().getParcelableExtra("LOCATION");

        outbreakViewModel = ViewModelProviders.of(this).get(OutbreakViewModel.class);
        outbreakViewModel.init();

        RecyclerView outbreakRecyclerView = findViewById(R.id.outbreak_rv);
        ProgressBar progressBar = findViewById(R.id.outbreaks_pb);

        OutbreakAdapter outbreakAdapter = new OutbreakAdapter(outbreaks,this, location);
        StaggeredGridLayoutManager staggeredGridLayoutManager = new StaggeredGridLayoutManager(2, LinearLayoutManager.VERTICAL);
        outbreakRecyclerView.setHasFixedSize(true);
        outbreakRecyclerView.setLayoutManager(staggeredGridLayoutManager);
        outbreakRecyclerView.setAdapter(outbreakAdapter);
        outbreakRecyclerView.setRecyclerListener(recyclerListener);

        outbreakViewModel.getOutbreakRepository().observe(this, responseData->{
            outbreaks.addAll(responseData);
            outbreakAdapter.notifyDataSetChanged();
        });

        outbreakViewModel.getProgressBar().observe(this, progress->{
            if(progress)
                progressBar.setVisibility(View.VISIBLE);
            else
                progressBar.setVisibility(View.GONE);
        });
    }

    private RecyclerView.RecyclerListener recyclerListener = holder -> {
        OutbreakAdapter.ViewHolder mapHolder = (OutbreakAdapter.ViewHolder) holder;
        if(mapHolder!=null && mapHolder.googleMap!=null){
            mapHolder.googleMap.clear();
            mapHolder.googleMap.setMapType(GoogleMap.MAP_TYPE_NONE);
        }
    };

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
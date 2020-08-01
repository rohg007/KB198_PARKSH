package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

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

        HealthCenterViewModel healthCenterViewModel = ViewModelProviders.of(this).get(HealthCenterViewModel.class);
        healthCenterViewModel.init();

        ProgressBar progressBar = findViewById(R.id.health_centers_pb);
        RecyclerView recyclerView = findViewById(R.id.health_center_rv);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        healthCenterAdapter = new HealthCenterAdapter(this, healthCenterArrayList);
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
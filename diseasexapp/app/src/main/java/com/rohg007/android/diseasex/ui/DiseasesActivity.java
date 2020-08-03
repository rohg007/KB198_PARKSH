package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.adapters.DiseaseAdapter;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.viewmodels.DiseaseViewModel;

import java.util.ArrayList;
import java.util.List;

public class DiseasesActivity extends AppCompatActivity {

    private ArrayList<Disease> diseases = new ArrayList<>();
    private DiseaseViewModel diseaseViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diseases);
        if(getSupportActionBar()!=null) {
            getSupportActionBar().setTitle(R.string.diseases);
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        diseaseViewModel = ViewModelProviders.of(this).get(DiseaseViewModel.class);
        diseaseViewModel.init();

        RecyclerView recyclerView = findViewById(R.id.diseases_rv);
        DiseaseAdapter diseaseAdapter = new DiseaseAdapter(diseases);
        ProgressBar progressBar = findViewById(R.id.diseases_pb);

        recyclerView.setHasFixedSize(true);
        StaggeredGridLayoutManager staggeredGridLayoutManager = new StaggeredGridLayoutManager(2, LinearLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(staggeredGridLayoutManager);
        recyclerView.setAdapter(diseaseAdapter);

        diseaseViewModel.getDiseaseRepository().observe(this, responseData -> {
            diseases.addAll(responseData);
            diseaseAdapter.notifyDataSetChanged();
        });

        diseaseViewModel.getProgressBar().observe(this, progress -> {
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

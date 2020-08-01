package com.rohg007.android.diseasex.ui;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.rohg007.android.diseasex.MapsActivity;
import com.rohg007.android.diseasex.R;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        startActivity(new Intent(SplashActivity.this, MapsActivity.class));
        finish();
    }
}

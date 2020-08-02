package com.rohg007.android.diseasex.ui;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.model.LatLng;
import com.rohg007.android.diseasex.broadcast_recievers.GeofenceBroadcastReciever;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.viewmodels.DiseaseViewModel;
import com.rohg007.android.diseasex.viewmodels.OutbreakViewModel;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import static com.rohg007.android.diseasex.utils.Constants.GEOFENCE_REQ_CODE;
import static com.rohg007.android.diseasex.utils.Constants.GEOFENCE_REQ_ID;

public class StartupFragment extends Fragment {
    public static final String TAG = "startup_fragment";
    private PackInitialData mCallback;
    private ArrayList<Outbreak> outbreaksList = new ArrayList<>();
    private ArrayList<Disease> diseaseList = new ArrayList<>();
    private OutbreakViewModel outbreakViewModel;
    private DiseaseViewModel diseaseViewModel;
    private GeofencingClient geofencingClient;
    private PendingIntent geofencePendingIntent;

    @Override
    public void onAttach(@NonNull Activity activity) {
        super.onAttach(activity);
        outbreakViewModel = ViewModelProviders.of((FragmentActivity) activity).get(OutbreakViewModel.class);
        diseaseViewModel = ViewModelProviders.of((FragmentActivity) activity).get(DiseaseViewModel.class);
        geofencingClient = LocationServices.getGeofencingClient(activity);
        outbreakViewModel.init();
        diseaseViewModel.init();
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        try {
            mCallback = (PackInitialData) context;
        } catch (ClassCastException e){
            throw new ClassCastException(context.toString()
                    + " must implement PackInitialData");
        }
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRetainInstance(true);
        outbreakViewModel.getOutbreakRepository().observe(this, outbreaks -> {
            if(outbreaks!=null) {
                outbreaksList.addAll(outbreaks);
                mCallback.communicate(outbreaksList);
                startGeofence();
            }
        });
        diseaseViewModel.getDiseaseRepository().observe(this, diseases -> {
            if(diseases!=null){
                diseaseList.addAll(diseases);
                mCallback.passDisease(diseaseList);
            }
        });
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mCallback = null;
    }

    private void startGeofence() {
        Log.i(TAG, "startGeofence()");
        for(Outbreak o : outbreaksList){
            Geofence geofence = createGeofence( o.getLatlng(), 1000 );
            GeofencingRequest geofenceRequest = createGeofencingRequest( geofence);
            addGeofence( geofenceRequest, o);
        }
    }

    private Geofence createGeofence(LatLng latLng, float radius){
        Log.i(TAG, "createGeoFence()");
        return new Geofence.Builder()
                .setRequestId(GEOFENCE_REQ_ID)
                .setCircularRegion(latLng.latitude,latLng.longitude,radius)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .build();
    }

    private GeofencingRequest createGeofencingRequest(Geofence geofence){
        Log.i(TAG, "createGeofenceRequest()");
        return new GeofencingRequest.Builder()
                .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
                .addGeofence(geofence)
                .build();
    }

    private void addGeofence(GeofencingRequest geofencingRequest, Outbreak o){
        Log.i(TAG, "addGeofence()");
        if(checkPermission()) {
            geofencingClient.addGeofences(geofencingRequest, createGeofencePendingIntent(o))
                    .addOnSuccessListener(getActivity(), aVoid -> {
                        Log.i(TAG, "Geofence Successfully added");
//                        Toast.makeText(getContext(), "Geofences Added Successfully", Toast.LENGTH_SHORT).show();
                    })
                    .addOnFailureListener(getActivity(), e -> {
                        Log.i(TAG, "Geofence addition failure: "+e.getMessage());
//                        Toast.makeText(getContext(),"Geofence Failure", Toast.LENGTH_SHORT).show();
                    });
        }
    }

    private PendingIntent createGeofencePendingIntent(Outbreak o){
        Log.i(TAG, "createGeofencePendingIntent()");
        if(geofencePendingIntent!=null)
            return geofencePendingIntent;
        Intent intent = new Intent(getActivity(), GeofenceBroadcastReciever.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        Bundle outbreakBundle = new Bundle();
        if(o==null)
            Log.e("Startup Fragment", "Outbreak is NULL");
        outbreakBundle.putParcelable("OUTBREAK",o);
        intent.putExtra("INFO", outbreakBundle);
        int uniqueInt = (int) (System.currentTimeMillis() & 0xfffffff);
        return PendingIntent.getBroadcast(getActivity(), uniqueInt, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }

    private boolean checkPermission(){
        Log.i(TAG, "checkPermission()");
        return ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ;
    }
}

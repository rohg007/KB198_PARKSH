package com.rohg007.android.diseasex;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.Geocoder;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.PopupMenu;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.Circle;
import com.google.android.gms.maps.model.CircleOptions;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.leinardi.android.speeddial.SpeedDialActionItem;
import com.leinardi.android.speeddial.SpeedDialView;
import com.rohg007.android.diseasex.broadcast_recievers.GeofenceBroadcastReciever;
import com.rohg007.android.diseasex.models.Disease;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.ui.CenterDetailSheet;
import com.rohg007.android.diseasex.ui.DiagnosisQuestionFragment;
import com.rohg007.android.diseasex.ui.DiseasesActivity;
import com.rohg007.android.diseasex.ui.HealthCentersActivity;
import com.rohg007.android.diseasex.ui.OubreaksActivity;
import com.rohg007.android.diseasex.ui.PackInitialData;
import com.rohg007.android.diseasex.ui.PastOutbreaksActivity;
import com.rohg007.android.diseasex.ui.StartupFragment;
import com.rohg007.android.diseasex.ui.UserEntryDialogFragment;
import com.rohg007.android.diseasex.utils.Constants;

import java.util.ArrayList;

import static com.rohg007.android.diseasex.utils.Constants.FASTEST_INTERVAL;
import static com.rohg007.android.diseasex.utils.Constants.GEOFENCE_REQ_CODE;
import static com.rohg007.android.diseasex.utils.Constants.GEOFENCE_REQ_ID;
import static com.rohg007.android.diseasex.utils.Constants.REQ_PERMISSION;
import static com.rohg007.android.diseasex.utils.Constants.UPDATE_INTERVAL;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback, GoogleMap.OnMapClickListener,
        GoogleMap.OnMarkerClickListener, GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener,
        LocationListener, GoogleMap.OnCircleClickListener,PackInitialData, PopupMenu.OnMenuItemClickListener {

    private static final String LOG_TAG = MapsActivity.class.getSimpleName();
    private SupportMapFragment mapFragment;
    private GoogleMap googleMap;
    private GoogleApiClient googleApiClient;
    private LocationRequest locationRequest;
    private Location lastLocation;
    private FusedLocationProviderClient fusedLocationProviderClient;
    private LocationCallback locationCallback;
    private Marker currentLocationMarker;
    private GeofencingClient geofencingClient;
    private Circle geoFenceCircle;
    private ArrayList<Outbreak> outbreaks = new ArrayList<>();
    private ArrayList<Disease> diseases = new ArrayList<>();
    SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        sharedPreferences = getSharedPreferences(Constants.PREFS_KEY, MODE_PRIVATE);

        FragmentManager fragmentManager = getSupportFragmentManager();
        StartupFragment startupFragment = (StartupFragment) fragmentManager.findFragmentByTag(StartupFragment.TAG);
        UserEntryDialogFragment userEntryDialogFragment = (UserEntryDialogFragment) fragmentManager.findFragmentByTag(UserEntryDialogFragment.TAG);
        if(startupFragment==null){
            fragmentManager.beginTransaction().add(new StartupFragment(), StartupFragment.TAG).commit();
        }
        String email = sharedPreferences.getString("EMAIL","empty");
        Log.e(LOG_TAG,"Email:"+email);
        String phone = sharedPreferences.getString("PHONE", "empty");
        Log.e(LOG_TAG,"Phone:"+phone);
        if(email.equals("empty") && phone.equals("empty"))
            fragmentManager.beginTransaction().add(new UserEntryDialogFragment(), UserEntryDialogFragment.TAG).commit();
        //Google Maps Setup
        initGMaps();

        //Create Api for Geofences
        createGoogleApi();

        //Set up Location Update Callback
        locationCallback = new LocationCallback(){
            @Override
            public void onLocationResult(LocationResult locationResult) {
                super.onLocationResult(locationResult);
                if(locationResult==null)
                    return;
                Location currLocation = locationResult.getLastLocation();
                onLocationChanged(currLocation);
            }
        };
        // set up fused Location Provider
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);

        // set up Geofencing Client
        geofencingClient = LocationServices.getGeofencingClient(this);

        SpeedDialView speedDialView = findViewById(R.id.speedDial);
        speedDialView.inflate(R.menu.menu_speed_dial);
        speedDialView.setOnActionSelectedListener(actionItem -> {
            if(actionItem.getId()==R.id.view_diseases){
                Intent intent = new Intent(MapsActivity.this, DiseasesActivity.class);
                startActivity(intent);
                return true;
            } else if(actionItem.getId() == R.id.view_outbreak){
                Intent intent = new Intent(MapsActivity.this, OubreaksActivity.class);
                intent.putExtra("LOCATION", lastLocation);
                startActivity(intent);
                return true;
            } else if(actionItem.getId() == R.id.view_health_centers){
                Intent intent = new Intent(MapsActivity.this, HealthCentersActivity.class);
                intent.putExtra("LOCATION", lastLocation);
                startActivity(intent);
                return true;
            } else if(actionItem.getId() == R.id.diagnose_self){
                getSupportFragmentManager().beginTransaction().add(new DiagnosisQuestionFragment(diseases), DiagnosisQuestionFragment.TAG).commit();
            } else if(actionItem.getId() == R.id.view_past_outbreaks){
                Intent intent = new Intent(MapsActivity.this, PastOutbreaksActivity.class);
                intent.putExtra("LOCATION", lastLocation);
                startActivity(intent);
            }
            return false;
        });
    }

    private void initGMaps(){
        mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        assert mapFragment != null;
        mapFragment.getMapAsync(this);
    }

    private void createGoogleApi(){
        Log.v(LOG_TAG, "createGoogleApi()");
        if(googleApiClient==null){
            googleApiClient = new GoogleApiClient.Builder(this)
                    .addConnectionCallbacks(this)
                    .addOnConnectionFailedListener(this)
                    .addApi(LocationServices.API).build();
        }
    }

    private void getLastKnownLocation() {
        Log.i(LOG_TAG, "getLastKnownLocation()");
        if(checkPermission()){
            fusedLocationProviderClient.getLastLocation().addOnSuccessListener(location -> {
                lastLocation = location;
                if(lastLocation!=null){
                    float zoom = 14f;
                    CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(new LatLng(lastLocation.getLatitude(), lastLocation.getLongitude()), zoom);
                    googleMap.animateCamera(cameraUpdate);
//                    startGeofence();
                }
                startLocationUpdates();
            });
        } else
            askPermission();
    }

    // Start location Updates
    private void startLocationUpdates(){
        Log.i(LOG_TAG, "startLocationUpdates()");
        locationRequest = LocationRequest.create()
                .setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY)
                .setInterval(UPDATE_INTERVAL)
                .setFastestInterval(FASTEST_INTERVAL);

        if ( checkPermission() )
            fusedLocationProviderClient.requestLocationUpdates(locationRequest,locationCallback, Looper.getMainLooper());
    }

    private boolean checkPermission(){
        Log.i(LOG_TAG, "checkPermission()");
        return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ;
    }

    // Asks for permission
    private void askPermission() {
        Log.d(LOG_TAG, "askPermission()");
        ActivityCompat.requestPermissions(
                this,
                new String[] { Manifest.permission.ACCESS_FINE_LOCATION },
                REQ_PERMISSION
        );
    }

    private void updateCurrentLocationMarker(LatLng latLng){
        MarkerOptions markerOptions = new MarkerOptions().position(latLng).title("Current Location");
        if(currentLocationMarker!=null)
            currentLocationMarker.remove();
        currentLocationMarker = googleMap.addMarker(markerOptions);
    }

    // Verify user's response of the permission requested
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.d(LOG_TAG, "onRequestPermissionsResult()");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch ( requestCode ) {
            case REQ_PERMISSION: {
                if ( grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED ){
                    // Permission granted
                    getLastKnownLocation();

                } else {
                    // Permission denied
                    permissionsDenied();
                }
                break;
            }
        }
    }

    // App cannot work without the permissions
    private void permissionsDenied() {
        Log.w(LOG_TAG, "permissionsDenied()");
    }

    @Override
    protected void onStart() {
        super.onStart();
        googleApiClient.connect();
        Log.wtf(MapsActivity.class.getSimpleName(),Integer.toString(outbreaks.size()));
    }

    @Override
    protected void onStop() {
        super.onStop();
        googleApiClient.disconnect();
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        Log.v(LOG_TAG, "onMapReady()");
        this.googleMap = googleMap;
        this.googleMap.setOnMapClickListener(this);
        this.googleMap.setOnMarkerClickListener(this);
        this.googleMap.setOnCircleClickListener(this);
    }

    @Override
    public void onMapClick(LatLng latLng) {
        Log.v(LOG_TAG, "Map CLicked:"+latLng);
    }

    @Override
    public boolean onMarkerClick(Marker marker) {
//        Log.v(LOG_TAG, "onMarkerClick()");
//        showBottomSheetDialogFragment(Centers.getDummyCenters().get(0));
        return false;
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {
        Log.i(LOG_TAG, "onConnected()");
        getLastKnownLocation();
        if(lastLocation!=null) {
            updateCurrentLocationMarker(new LatLng(lastLocation.getLatitude(), lastLocation.getLongitude()));
        }
    }

    @Override
    public void communicate(ArrayList<Outbreak> outbreaks) {
        this.outbreaks = outbreaks;
        drawGeofenceCircles();
        Log.wtf(MapsActivity.class.getSimpleName(),Integer.toString(outbreaks.size()));
    }

    @Override
    public void passDisease(ArrayList<Disease> diseases) {
        this.diseases = diseases;
    }

    private void drawGeofenceCircles(){
        for(int i=0;i<outbreaks.size();i++){
            CircleOptions circleOptions = new CircleOptions()
                        .center(outbreaks.get(i).getLatlng())
                        .strokeColor(Color.argb(50, 70, 70, 70))
                        .fillColor(Color.argb(100, 255, 0, 0))
                        .radius(1000.0);
            if(outbreaks.get(i).getFlag()) {
                circleOptions.fillColor(Color.argb(100, 0, 0, 255));
            }
            Circle circle = googleMap.addCircle(circleOptions);
            circle.setClickable(true);
            circle.setTag(outbreaks.get(i));
        }
    }

    @Override
    public void onCircleClick(Circle circle) {
        Outbreak o = (Outbreak) circle.getTag();
//        Toast.makeText(this, "show Bottom Sheet for Circle", Toast.LENGTH_SHORT).show();
        showBottomSheetDialogFragment(o);
    }

    @Override
    public void onConnectionSuspended(int i) {
        Log.w(LOG_TAG, "onConnectionSuspended()");
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Log.w(LOG_TAG, "onConnectionSuspended()");
    }

    @Override
    public void onLocationChanged(Location location) {
        lastLocation = location;
        assert lastLocation!=null;
        updateCurrentLocationMarker(new LatLng(lastLocation.getLatitude(),lastLocation.getLongitude()));
    }

    public static Intent makeNotificationIntent(Context geofenceService, String msg)
    {
        Log.d(LOG_TAG,msg);
        return new Intent(geofenceService,MapsActivity.class);
    }

    public void showBottomSheetDialogFragment(Outbreak outbreak) {
        CenterDetailSheet bottomSheetFragment = new CenterDetailSheet(outbreak);
        bottomSheetFragment.show(getSupportFragmentManager(), bottomSheetFragment.getTag());
    }

    public void showPopup(View v){
        PopupMenu popupMenu = new PopupMenu(this,v);
        popupMenu.setOnMenuItemClickListener(this);
        popupMenu.inflate(R.menu.popup_menu);
        popupMenu.show();
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        if(item.getItemId()==R.id.update_notification_details){
            UserEntryDialogFragment userEntryDialogFragment = (UserEntryDialogFragment) getSupportFragmentManager().findFragmentByTag(UserEntryDialogFragment.TAG);
            getSupportFragmentManager().beginTransaction().add(new UserEntryDialogFragment(), UserEntryDialogFragment.TAG).commit();
            return true;
        }
        return false;
    }
}
//
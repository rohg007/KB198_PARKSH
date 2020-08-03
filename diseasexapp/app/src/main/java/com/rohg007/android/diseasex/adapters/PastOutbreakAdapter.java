package com.rohg007.android.diseasex.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.ui.OutbreakDetailActivity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class PastOutbreakAdapter extends RecyclerView.Adapter<PastOutbreakAdapter.ViewHolder> {
    private ArrayList<Outbreak> outbreaks;
    private Context context;
    private Location currLocation;

    public PastOutbreakAdapter(ArrayList<Outbreak> outbreaks, Context context, Location currLocation) {
        super();
        this.outbreaks = outbreaks;
        this.context = context;
        this.currLocation = currLocation;
    }

    @NonNull
    @Override
    public PastOutbreakAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new PastOutbreakAdapter.ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.outbreak_list_item,parent,false));
    }

    @Override
    public void onBindViewHolder(@NonNull PastOutbreakAdapter.ViewHolder holder, int position) {
        holder.itemView.setOnClickListener(v -> {
            Context context = v.getContext();
            Intent i = new Intent(context, OutbreakDetailActivity.class);
            i.putExtra("OUTBREAK",outbreaks.get(position));
            i.putExtra("LOCATION", currLocation);
            context.startActivity(i);
        });
        holder.bindView(position);
    }

    @Override
    public int getItemCount() {
        return outbreaks.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements OnMapReadyCallback {
        private MapView mapView;
        private TextView diseaseNameTv;
        private TextView addressTextView;
        private TextView distTextView;
        public GoogleMap googleMap;
        private View layout;
        private TextView outbreakTypeTv;

        private ViewHolder(@NonNull View itemView) {
            super(itemView);
            layout = itemView;
            mapView = layout.findViewById(R.id.outbreak_list_map);
            diseaseNameTv = layout.findViewById(R.id.disease_name_outbreak_list);
            addressTextView = layout.findViewById(R.id.outbreak_list_address_tv);
            distTextView = layout.findViewById(R.id.outbreak_list_dist_tv);
            outbreakTypeTv = layout.findViewById(R.id.outbreak_list_outbreak_type);
            if(mapView!=null){
                mapView.onCreate(null);
                mapView.getMapAsync(this);
            }
        }

        @Override
        public void onMapReady(GoogleMap googleMap) {
            MapsInitializer.initialize(context);
            this.googleMap = googleMap;
            setMapLocation();
        }

        private void setMapLocation(){
            if(googleMap==null)
                return;
            Outbreak data = (Outbreak) mapView.getTag();
            if(data==null)
                return;
            googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(data.getLatlng(), 13f));
            googleMap.addMarker(new MarkerOptions().position(data.getLatlng()));
            googleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
        }

        @SuppressLint("SetTextI18n")
        private void bindView(int pos){
            Outbreak item = outbreaks.get(pos);
            layout.setTag(this);
            mapView.setTag(item);
            setMapLocation();
            diseaseNameTv.setText(item.getDisease().getName());
            String address = getGeocodeLocation(item.getLatlng());
            if(address.equals("NA"))
                address = item.getHealthCenter().getAddress();
            addressTextView.setText(address);
            Location temp = new Location(LocationManager.GPS_PROVIDER);
            temp.setLatitude(item.getLatlng().latitude);
            temp.setLongitude(item.getLatlng().longitude);
            float dist = currLocation.distanceTo(temp);
            dist/=1000;
            distTextView.setText(Math.floor(dist) + " "+"Kms Away");
            if(item.getFlag())
                outbreakTypeTv.setText(R.string.animal_outbreak);
            else
                outbreakTypeTv.setText(R.string.human_outbreak);
        }

        private String getGeocodeLocation(LatLng location){
            Geocoder geocoder = new Geocoder(context);
            List<Address> addresses = new ArrayList<>();
            try {
                addresses = geocoder.getFromLocation(location.latitude,location.longitude,1);
            } catch (IOException e) {
                e.printStackTrace();
            }
            if(!addresses.isEmpty()) {
                int n = addresses.get(0).getMaxAddressLineIndex();
                Log.e("Center Detail Sheet",Integer.toString(n));
                StringBuilder s = new StringBuilder();
                for(int i=0;i<=n;i++){
                    s.append(addresses.get(0).getAddressLine(i));
                }
                return s.toString();
            } else return "NA";
        }

        private double distFrom(double lat1, double lng1, double lat2, double lng2) {
            double earthRadius = 3958.75;
            double dLat = Math.toRadians(lat2-lat1);
            double dLng = Math.toRadians(lng2-lng1);
            double sindLat = Math.sin(dLat / 2);
            double sindLng = Math.sin(dLng / 2);
            double a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
                    * Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2));
            double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            double dist = earthRadius * c;

            return dist*1.60934;
        }
    }
}

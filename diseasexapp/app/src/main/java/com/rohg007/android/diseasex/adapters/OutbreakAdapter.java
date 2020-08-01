package com.rohg007.android.diseasex.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.MarkerOptions;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.NamedLocations;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.ui.OutbreakDetailActivity;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class OutbreakAdapter extends RecyclerView.Adapter<OutbreakAdapter.ViewHolder> {
    private ArrayList<Outbreak> outbreaks;
    private Context context;

    public OutbreakAdapter(ArrayList<Outbreak> outbreaks, Context context) {
        super();
        this.outbreaks = outbreaks;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.outbreak_list_item,parent,false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.itemView.setOnClickListener(v -> {
            Context context = v.getContext();
            Intent i = new Intent(context, OutbreakDetailActivity.class);
            i.putExtra("OUTBREAK",outbreaks.get(position));
            context.startActivity(i);
        });
        holder.bindView(position);
    }

    @Override
    public int getItemCount() {
        return outbreaks.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements OnMapReadyCallback{
        private MapView mapView;
        private TextView diseaseNameTv;
        public GoogleMap googleMap;
        private View layout;

        private ViewHolder(@NonNull View itemView) {
            super(itemView);
            layout = itemView;
            mapView = layout.findViewById(R.id.outbreak_list_map);
            diseaseNameTv = layout.findViewById(R.id.disease_name_outbreak_list);
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

        private void bindView(int pos){
            Outbreak item = outbreaks.get(pos);
            layout.setTag(this);
            mapView.setTag(item);
            setMapLocation();
            diseaseNameTv.setText(item.getDisease().getName());
        }
    }
}

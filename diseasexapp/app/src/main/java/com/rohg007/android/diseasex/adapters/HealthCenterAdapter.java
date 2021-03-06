package com.rohg007.android.diseasex.adapters;

import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.HealthCenter;

import java.util.ArrayList;
import java.util.HashSet;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class HealthCenterAdapter extends RecyclerView.Adapter<HealthCenterAdapter.HealthCenterViewHolder> {

    private ArrayList<HealthCenter> healthCenters;
    private Context context;
    private Location currLocation;

    public HealthCenterAdapter(Context context, ArrayList<HealthCenter> healthCenters, Location currLocation) {
        this.context = context;
        this.healthCenters = healthCenters;
        this.currLocation = currLocation;
    }

    @NonNull
    @Override
    public HealthCenterAdapter.HealthCenterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.health_center_cell, parent, false);
        return new HealthCenterViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull HealthCenterAdapter.HealthCenterViewHolder holder, int position) {
        if(healthCenters!=null && position<healthCenters.size()){

            HealthCenter healthCenter = healthCenters.get(position);
            String s = healthCenter.getAddress()+" "+healthCenter.getPincode();
            holder.centerNameContent.setText(healthCenter.getName());
            holder.centerAddressContent.setText(s);
            holder.centerInchargeContent.setText(healthCenter.getIncharge());
            holder.affectedContent.setText(healthCenter.getTotalAffected().toString());
            holder.deathsContent.setText(healthCenter.getTotalDeaths().toString());
            holder.recoveredContent.setText(healthCenter.getTotalRecovered().toString());

            Location temp = new Location(LocationManager.GPS_PROVIDER);
            temp.setLatitude(healthCenter.getLatlng().latitude);
            temp.setLongitude(healthCenter.getLatlng().longitude);
            float dist = currLocation.distanceTo(temp);
            dist/=1000;
            holder.distTextView.setText(Math.floor(dist) + " "+"Kms Away");

            holder.webContentButton.setOnClickListener(v -> {
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setData(Uri.parse("https://"+healthCenter.getWeb()));
                context.startActivity(i);
            });

            holder.phoneContentButton.setOnClickListener(v -> {
                Intent i = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:"+healthCenter.getContact()));
                context.startActivity(i);
            });

            holder.emailContentButton.setOnClickListener(v -> {
                Intent i = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"+healthCenter.getEmail()));
                context.startActivity(i);
            });

            holder.locateMapButton.setOnClickListener(v->{
//                String uri = "geo:"+currLocation.getLatitude()+","+currLocation.getLongitude()+"?q=hospitals";
                String uri = "geo:"+healthCenter.getLatlng().latitude+","+healthCenter.getLatlng().longitude;
                Uri gmmIntentUri = Uri.parse(uri);
                Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                mapIntent.setPackage("com.google.android.apps.maps");
                context.startActivity(mapIntent);
            });
        }
    }

    @Override
    public int getItemCount() {
        return healthCenters.size();
    }


    public class HealthCenterViewHolder extends RecyclerView.ViewHolder{
        TextView centerNameContent;
        TextView centerAddressContent;
        TextView centerInchargeContent;
        TextView affectedContent;
        TextView deathsContent;
        TextView recoveredContent;
        Button webContentButton;
        Button phoneContentButton;
        Button emailContentButton;
        Button locateMapButton;
        TextView distTextView;

        public HealthCenterViewHolder(@NonNull View itemView) {
            super(itemView);
            centerNameContent = itemView.findViewById(R.id.health_center_name_content);
            centerAddressContent = itemView.findViewById(R.id.address_content_tv);
            centerInchargeContent = itemView.findViewById(R.id.incharge_content_tv);
            affectedContent = itemView.findViewById(R.id.affected_content_tv);
            deathsContent = itemView.findViewById(R.id.deaths_content_tv);
            recoveredContent = itemView.findViewById(R.id.recovered_content_tv);
            webContentButton = itemView.findViewById(R.id.check_web_content_button);
            phoneContentButton = itemView.findViewById(R.id.call_content_button);
            emailContentButton = itemView.findViewById(R.id.email_content_button);
            distTextView = itemView.findViewById(R.id.cur_dist_tv);
            locateMapButton = itemView.findViewById(R.id.locate_on_map);
        }
    }
}

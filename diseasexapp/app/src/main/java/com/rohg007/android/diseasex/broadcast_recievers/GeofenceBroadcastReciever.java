package com.rohg007.android.diseasex.broadcast_recievers;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.os.IBinder;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofenceStatusCodes;
import com.google.android.gms.location.GeofencingEvent;
import com.rohg007.android.diseasex.MapsActivity;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.models.Outbreak;
import com.rohg007.android.diseasex.network.TwilioRepository;
import com.rohg007.android.diseasex.utils.Constants;
import com.rohg007.android.diseasex.utils.SendMail;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.app.TaskStackBuilder;

public class GeofenceBroadcastReciever extends BroadcastReceiver {
    private static final String LOG_TAG = GeofenceBroadcastReciever.class.getSimpleName();
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(LOG_TAG, "onRecieve");
        if(intent==null){
            Log.e(LOG_TAG, "INTENT IS NULL");
        }
        Bundle outbreakBundle = intent.getBundleExtra("INFO");
        if(outbreakBundle==null){
            Log.e(LOG_TAG, "Bundle is NULL");
        }
        Outbreak o = outbreakBundle.getParcelable("OUTBREAK");
        if(o == null){
            Log.e(LOG_TAG, "OUTBREAK IS NULL");
        }
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
        if(geofencingEvent.hasError()){
            String errorMessage = GeofenceStatusCodes.getStatusCodeString(geofencingEvent.getErrorCode());
            Log.e(LOG_TAG, errorMessage);
        }

        int geoFenceTransition = geofencingEvent.getGeofenceTransition();
        if(geoFenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER || geoFenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT){
            List<Geofence> triggeringGeofences = geofencingEvent.getTriggeringGeofences();
            String geoFenceTransitionDetails = getGeofenceTrasitionDetails(geoFenceTransition, triggeringGeofences);
            sendNotification(context,geoFenceTransitionDetails, o);
        }
    }

    private String getGeofenceTrasitionDetails(int geoFenceTransition, List<Geofence> triggeringGeofences) {
        // get the ID of each geofence triggered
        Log.i(LOG_TAG, "getGeofenceTransitionDetails");
        ArrayList<String> triggeringGeofencesList = new ArrayList<>();
        for ( Geofence geofence : triggeringGeofences ) {
            triggeringGeofencesList.add( geofence.getRequestId() );
        }

        String status = null;
        if ( geoFenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER )
            status = "Entering ";
        else if ( geoFenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT )
            status = "Exiting ";
        return status + TextUtils.join( ", ", triggeringGeofencesList);
    }

    private void sendNotification(Context context,  String msg , Outbreak o) {
        Log.i(LOG_TAG, "sendNotification: " + msg );
        SharedPreferences sharedPreferences = Objects.requireNonNull(context).getSharedPreferences(Constants.PREFS_KEY, Context.MODE_PRIVATE);
        String email = sharedPreferences.getString("EMAIL","empty");
        if(!email.equals("empty")) {
            SendMail sendMail = new SendMail(context, email,"You're in an outbreak zone!", getEmailBody(o));
            sendMail.execute();
        }
        TwilioRepository twilioRepository = new TwilioRepository();
        twilioRepository.sendMessage(o);
        // Intent to start the main Activity
        Intent notificationIntent = MapsActivity.makeNotificationIntent(
              context , msg
        );

        TaskStackBuilder stackBuilder = TaskStackBuilder.create(context);
        stackBuilder.addParentStack(MapsActivity.class);
        stackBuilder.addNextIntent(notificationIntent);
        PendingIntent notificationPendingIntent = stackBuilder.getPendingIntent(Constants.GEOFENCE_REQ_CODE, PendingIntent.FLAG_UPDATE_CURRENT);

        // Creating and sending Notification
        NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(context);
        notificationManagerCompat.notify(Constants.GEOFENCE_REQ_CODE, createNotification(context, msg, notificationPendingIntent, o));
    }

    private Notification createNotification(Context context, String msg, PendingIntent notificationPendingIntent, Outbreak o) {
        Log.i(LOG_TAG, "createNotification");
        String channelId = (o.getFlag()) ? Constants.ANIMAL_CHANNEL_ID : Constants.CHANNEL_ID;
        String title = (o.getFlag()) ? "You're in an Animal Outbreak Zone" : "You're in an Outbreak Zone";
        Notification notification = new NotificationCompat.Builder(context, Constants.CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_notification_icon)
                .setContentTitle(title)
                .setContentText(o.getDisease().getName().concat(" is spreading in this area!\nTap to enter the app to view the precautions or contact the health center."))
                .setStyle(new NotificationCompat.BigTextStyle().bigText(o.getDisease().getName().concat(" is spreading in this area!\nTap to enter the app to view the precautions or contact the health center.")))
                .setContentIntent(notificationPendingIntent)
                .setTicker(msg)
                .setDefaults(Notification.DEFAULT_ALL)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();
        return notification;
    }

    private String getEmailBody(Outbreak o){
        Date currDate = Calendar.getInstance().getTime();

        if(o.getFlag()){
            String body = "Hello from DiseaseX\n\n"
                    +"You entered an animal outbreak region at "+currDate.toString()+"\n"
                    +"Some Info about the region:\n\n"
                    +"Disease Name: "+o.getDisease().getName()+"\n"
                    +"Livestock Affected: "+o.getDisease().getLivestock().get(0).getBreed()+"\n"
                    +"Vaccination Preferred: "+o.getDisease().getVaccine().get(0).getName()+"\n"
                    +"Morbidity: "+o.getDisease().getMorbidity().toString()+"\n"
                    +"Mortality: "+o.getDisease().getMortality().toString()+"\n\n"
                    +"Associated Health Center:\n\n"
                    +"Center Name: "+o.getHealthCenter().getName()+"\n"
                    +"Address: "+o.getHealthCenter().getAddress()+"\n"
                    +"Contact Number: "+o.getHealthCenter().getContact()+"\n"
                    +"Email: "+o.getHealthCenter().getEmail()+"\n"
                    +"Web: "+o.getHealthCenter().getWeb()+"\n\n"
                    +"Wishing you health!\n"
                    +"DiseaseX";
            return body;
        }

        String body = "Hello from DiseaseX\n\n"
                +"You entered an outbreak region at "+currDate.toString()+"\n"
                +"Some Info about the region:\n\n"
                +"Disease Name: "+o.getDisease().getName()+"\n"
                +"Symptoms: "+o.getDisease().getSymptoms()+"\n"
                +"Precautions: "+o.getDisease().getPrecautions()+"\n"
                +"Morbidity: "+o.getDisease().getMorbidity().toString()+"\n"
                +"Mortality: "+o.getDisease().getMortality().toString()+"\n\n"
                +"Associated Health Center:\n\n"
                +"Center Name: "+o.getHealthCenter().getName()+"\n"
                +"Address: "+o.getHealthCenter().getAddress()+"\n"
                +"Contact Number: "+o.getHealthCenter().getContact()+"\n"
                +"Email: "+o.getHealthCenter().getEmail()+"\n"
                +"Web: "+o.getHealthCenter().getWeb()+"\n\n"
                +"Wishing you health!\n"
                +"DiseaseX";
        return body;


    }
}

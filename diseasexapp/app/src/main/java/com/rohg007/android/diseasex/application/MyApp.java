package com.rohg007.android.diseasex.application;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;

import com.rohg007.android.diseasex.utils.Constants;

import androidx.core.app.NotificationCompat;

public class MyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
    }

    private void createNotificationChannel(){
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
            NotificationChannel notificationChannel = new NotificationChannel(Constants.CHANNEL_ID, "Geofence Notifications", NotificationManager.IMPORTANCE_HIGH);
            notificationChannel.setVibrationPattern(new long[]{300, 300, 300});
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (defaultSoundUri != null) {
                AudioAttributes att = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build();
                notificationChannel.setSound(defaultSoundUri, att);
            }
            notificationManager.createNotificationChannel(notificationChannel);
        }
    }
}

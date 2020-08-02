package com.rohg007.android.diseasex.network;

import android.util.Base64;
import android.util.Log;

import com.rohg007.android.diseasex.models.Outbreak;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class TwilioRepository {

    public static final String ACCOUNT_SID = "AC7a814d8fe5a83680a3439e020f2b90ab";
    public static final String AUTH_TOKEN = "d5f9f4137adbc2ec84c3654ac416338c";

    public void sendMessage(Outbreak o) {
        String body = "You entered an outbreak region at "+ Calendar.getInstance().getTime().toString()+"."+
                o.getDisease().getName()+" is spreading in this area. "+"Some precautions "+o.getDisease().getPrecautions();
        if(o.getFlag()){
            body = "You entered an animal outbreak region at "+ Calendar.getInstance().getTime().toString()+"."+
                    o.getDisease().getLivestock().get(0).getBreed()+" is affected in this area. "+"Some preferred vaccinations: "+o.getDisease().getVaccine().get(0).getName();
        }
        String from = "+12199644916";
        String to = "+919829661751";
        if(body.length()>122){
            body = body.substring(0, 121);
        }
        String base64EncodedCredentials = "Basic " + Base64.encodeToString(
                (ACCOUNT_SID + ":" + AUTH_TOKEN).getBytes(), Base64.NO_WRAP
        );

        Map<String, String> smsData = new HashMap<>();
        smsData.put("From", from);
        smsData.put("To", to);
        smsData.put("Body", body);


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.twilio.com/2010-04-01/")
                .build();
        TwilioAPI api = retrofit.create(TwilioAPI.class);

        api.sendMessage(ACCOUNT_SID, base64EncodedCredentials, smsData).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) Log.d("TAG", "onResponse->success");
                else {
                    try {
                        Log.e("TAG", "onResponse->failure"+response.code()+response.message()+"\n"+response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.d("TAG", "onFailure");
            }
        });
    }
}

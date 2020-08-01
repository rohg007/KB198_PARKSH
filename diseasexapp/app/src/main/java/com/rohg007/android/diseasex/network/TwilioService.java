package com.rohg007.android.diseasex.network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TwilioService {
    private static Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://api.twilio.com/2010-04-01/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    static <S> S createService(Class<S> serviceClass){
        return retrofit.create(serviceClass);
    }
}

package com.rohg007.android.diseasex.network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

class RetrofitService {
    private static String BASE_URL = "https://diseasex-backend.herokuapp.com/";
    private static Retrofit retrofit = new Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build();

    static <S> S createService(Class<S> serviceClass){
        return retrofit.create(serviceClass);
    }
}

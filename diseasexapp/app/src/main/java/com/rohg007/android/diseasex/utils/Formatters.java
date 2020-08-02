package com.rohg007.android.diseasex.utils;

import java.util.ArrayList;

public class Formatters {

    public static String bulletedString(String[] s){
        StringBuilder htmlString = new StringBuilder();
        for(String temp : s){
            htmlString.append("&#8226; ").append(temp).append("<br/>");
        }
        return htmlString.toString();
    }

    public static String bulletedStringArrayList(ArrayList<String> s){
        StringBuilder htmlString = new StringBuilder();
        for(String temp : s){
            htmlString.append("&#8226; ").append(temp).append("<br/>");
        }
        return htmlString.toString();
    }
}

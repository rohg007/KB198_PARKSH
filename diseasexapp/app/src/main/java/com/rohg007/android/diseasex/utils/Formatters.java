package com.rohg007.android.diseasex.utils;

public class Formatters {

    public static String bulletedString(String[] s){
        StringBuilder htmlString = new StringBuilder();
        for(String temp : s){
            htmlString.append("&#8226; ").append(temp).append("<br/>");
        }
        return htmlString.toString();
    }
}

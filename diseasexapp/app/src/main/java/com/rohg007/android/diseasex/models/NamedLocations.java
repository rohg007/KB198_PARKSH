package com.rohg007.android.diseasex.models;

import com.google.android.gms.maps.model.LatLng;

public class NamedLocations {
    private String name;
    private LatLng location;

    public NamedLocations(String name, LatLng location) {
        this.name = name;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LatLng getLocation() {
        return location;
    }

    public void setLocation(LatLng location) {
        this.location = location;
    }

    public static final NamedLocations[] LIST_LOCATIONS = new NamedLocations[]{
            new NamedLocations("Cape Town", new LatLng(-33.920455, 18.466941)),
            new NamedLocations("Beijing", new LatLng(39.937795, 116.387224)),
            new NamedLocations("Bern", new LatLng(46.948020, 7.448206)),
            new NamedLocations("Breda", new LatLng(51.589256, 4.774396)),
            new NamedLocations("Brussels", new LatLng(50.854509, 4.376678)),
            new NamedLocations("Copenhagen", new LatLng(55.679423, 12.577114)),
            new NamedLocations("Hannover", new LatLng(52.372026, 9.735672)),
            new NamedLocations("Helsinki", new LatLng(60.169653, 24.939480)),
            new NamedLocations("Hong Kong", new LatLng(22.325862, 114.165532)),
            new NamedLocations("Istanbul", new LatLng(41.034435, 28.977556)),
            new NamedLocations("Johannesburg", new LatLng(-26.202886, 28.039753)),
            new NamedLocations("Lisbon", new LatLng(38.707163, -9.135517)),
            new NamedLocations("London", new LatLng(51.500208, -0.126729)),
            new NamedLocations("Madrid", new LatLng(40.420006, -3.709924)),
            new NamedLocations("Mexico City", new LatLng(19.427050, -99.127571)),
            new NamedLocations("Moscow", new LatLng(55.750449, 37.621136)),
            new NamedLocations("New York", new LatLng(40.750580, -73.993584)),
            new NamedLocations("Oslo", new LatLng(59.910761, 10.749092)),
            new NamedLocations("Paris", new LatLng(48.859972, 2.340260)),
            new NamedLocations("Prague", new LatLng(50.087811, 14.420460)),
            new NamedLocations("Rio de Janeiro", new LatLng(-22.90187, -43.232437)),
            new NamedLocations("Rome", new LatLng(41.889998, 12.500162)),
            new NamedLocations("Sao Paolo", new LatLng(-22.863878, -43.244097)),
            new NamedLocations("Seoul", new LatLng(37.560908, 126.987705)),
            new NamedLocations("Stockholm", new LatLng(59.330650, 18.067360)),
            new NamedLocations("Sydney", new LatLng(-33.873651, 151.2068896)),
            new NamedLocations("Taipei", new LatLng(25.022112, 121.478019)),
            new NamedLocations("Tokyo", new LatLng(35.670267, 139.769955)),
            new NamedLocations("Tulsa Oklahoma", new LatLng(36.149777, -95.993398)),
            new NamedLocations("Vaduz", new LatLng(47.141076, 9.521482)),
            new NamedLocations("Vienna", new LatLng(48.209206, 16.372778)),
            new NamedLocations("Warsaw", new LatLng(52.235474, 21.004057)),
            new NamedLocations("Wellington", new LatLng(-41.286480, 174.776217)),
            new NamedLocations("Winnipeg", new LatLng(49.875832, -97.150726))
    };

}

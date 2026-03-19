package com.ajeshwar.weatherpulse.model;

import lombok.Data;
import java.util.List;

@Data
public class WeatherResponse {

    private String name;        // city name
    private Sys sys;            // country
    private Main main;          // temp, humidity
    private Wind wind;          // wind speed
    private List<Weather> weather; // description, icon
    private long dt;            // timestamp

    @Data
    public static class Main {
        private double temp;
        private double feels_like;
        private double temp_min;
        private double temp_max;
        private int humidity;
        private int pressure;
    }

    @Data
    public static class Weather {
        private String main;
        private String description;
        private String icon;
    }

    @Data
    public static class Wind {
        private double speed;
        private int deg;
    }

    @Data
    public static class Sys {
        private String country;
        private long sunrise;
        private long sunset;
    }
}
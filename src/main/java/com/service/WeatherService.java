package com.ajeshwar.weatherpulse.service;

import com.ajeshwar.weatherpulse.model.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final RestTemplate restTemplate;

    @Value("${weather.api.key}")
    private String apiKey;

    private static final String BASE_URL =
        "https://api.openweathermap.org/data/2.5/weather";

    // Get weather by city name
    public WeatherResponse getWeatherByCity(String city) {
        String url = BASE_URL
            + "?q=" + city
            + "&appid=" + apiKey
            + "&units=metric";   // Celsius

        try {
            return restTemplate.getForObject(url, WeatherResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("City not found: " + city);
        }
    }

    // Get weather by coordinates
    public WeatherResponse getWeatherByCoords(double lat, double lon) {
        String url = BASE_URL
            + "?lat=" + lat
            + "&lon=" + lon
            + "&appid=" + apiKey
            + "&units=metric";

        try {
            return restTemplate.getForObject(url, WeatherResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not fetch weather for location");
        }
    }
}
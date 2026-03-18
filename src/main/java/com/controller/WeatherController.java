package com.ajeshwar.weatherpulse.controller;

import com.ajeshwar.weatherpulse.model.WeatherResponse;
import com.ajeshwar.weatherpulse.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    // GET weather by city name
    // Example: /api/weather?city=Hyderabad
    @GetMapping
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam String city) {
        return ResponseEntity.ok(
            weatherService.getWeatherByCity(city)
        );
    }

    // GET weather by coordinates
    // Example: /api/weather/coords?lat=17.38&lon=78.48
    @GetMapping("/coords")
    public ResponseEntity<WeatherResponse> getWeatherByCoords(
            @RequestParam double lat,
            @RequestParam double lon) {
        return ResponseEntity.ok(
            weatherService.getWeatherByCoords(lat, lon)
        );
    }
}
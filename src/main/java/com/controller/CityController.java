package com.ajeshwar.weatherpulse.controller;

import com.ajeshwar.weatherpulse.model.City;
import com.ajeshwar.weatherpulse.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    // GET all cities
    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        return ResponseEntity.ok(cityService.getAllCities());
    }

    // GET favourites only
    @GetMapping("/favourites")
    public ResponseEntity<List<City>> getFavourites() {
        return ResponseEntity.ok(cityService.getFavourites());
    }

    // POST save a city
    @PostMapping
    public ResponseEntity<City> saveCity(@RequestBody City city) {
        return ResponseEntity.ok(cityService.saveCity(city));
    }

    // PUT toggle favourite
    @PutMapping("/{id}/favourite")
    public ResponseEntity<City> toggleFavourite(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.toggleFavourite(id));
    }

    // DELETE a city
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
        return ResponseEntity.noContent().build();
    }
}
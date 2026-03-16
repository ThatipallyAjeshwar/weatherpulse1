package com.ajeshwar.weatherpulse.service;

import com.ajeshwar.weatherpulse.model.City;
import com.ajeshwar.weatherpulse.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {

    private final CityRepository cityRepository;

    // Get all saved cities
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    // Get favourite cities only
    public List<City> getFavourites() {
        return cityRepository.findByFavouriteTrue();
    }

    // Save a new city
    public City saveCity(City city) {
        if (cityRepository.existsByNameIgnoreCase(city.getName())) {
            throw new RuntimeException("City already saved: " + city.getName());
        }
        return cityRepository.save(city);
    }

    // Toggle favourite
    public City toggleFavourite(Long id) {
        City city = cityRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("City not found"));
        city.setFavourite(!city.isFavourite());
        return cityRepository.save(city);
    }

    // Delete a city
    public void deleteCity(Long id) {
        cityRepository.deleteById(id);
    }
}
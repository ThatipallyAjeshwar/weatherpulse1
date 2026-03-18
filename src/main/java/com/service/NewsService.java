package com.ajeshwar.weatherpulse.service;

import com.ajeshwar.weatherpulse.model.NewsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final RestTemplate restTemplate;

    @Value("${news.api.key}")
    private String apiKey;

    private static final String BASE_URL = "https://newsapi.org/v2";

    // Get top headlines by country
    public NewsResponse getTopHeadlines(String country) {
        String url = BASE_URL
            + "/top-headlines"
            + "?country=" + country
            + "&pageSize=10"
            + "&apiKey=" + apiKey;

        try {
            return restTemplate.getForObject(url, NewsResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not fetch news");
        }
    }

    // Search news by keyword
    public NewsResponse searchNews(String keyword) {
        String url = BASE_URL
            + "/everything"
            + "?q=" + keyword
            + "&sortBy=publishedAt"
            + "&pageSize=10"
            + "&language=en"
            + "&apiKey=" + apiKey;

        try {
            return restTemplate.getForObject(url, NewsResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not search news for: " + keyword);
        }
    }
}
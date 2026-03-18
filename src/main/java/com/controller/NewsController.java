package com.ajeshwar.weatherpulse.controller;

import com.ajeshwar.weatherpulse.model.NewsResponse;
import com.ajeshwar.weatherpulse.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    // GET top headlines
    // Example: /api/news?country=in
    @GetMapping
    public ResponseEntity<NewsResponse> getTopHeadlines(
            @RequestParam(defaultValue = "in") String country) {
        return ResponseEntity.ok(
            newsService.getTopHeadlines(country)
        );
    }

    // GET search news
    // Example: /api/news/search?keyword=cricket
    @GetMapping("/search")
    public ResponseEntity<NewsResponse> searchNews(
            @RequestParam String keyword) {
        return ResponseEntity.ok(
            newsService.searchNews(keyword)
        );
    } 
}
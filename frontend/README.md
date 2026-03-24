# 🌦️ WeatherPulse

> A Full Stack Weather & News Dashboard built with **React**, **Spring Boot**, and **MySQL**

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)

---

## 📌 About The Project

**WeatherPulse** is a full stack web application that allows users to:
- 🔍 Search any city and get **live weather data**
- 📰 Read **latest news headlines** by category
- ⭐ **Save favourite cities** to a MySQL database
- 📱 Use on any device — fully **responsive UI**

This project was built as part of my Full Stack Developer portfolio to demonstrate skills in **Java backend development**, **REST API integration**, **React frontend**, and **MySQL database management**.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🌤️ Live Weather | Real-time weather data from OpenWeatherMap API |
| 📰 News Feed | Top headlines and category search via NewsAPI |
| ⭐ Save Cities | Save, favourite and delete cities from MySQL DB |
| 🔍 City Search | Search any city in the world |
| 📱 Responsive | Works on mobile, tablet and desktop |
| 🎨 Hacker UI | Terminal-style dark dashboard design |

---

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Axios (HTTP requests)
- CSS-in-JS (inline styles)

### Backend
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- Maven

### Database
- MySQL 8.0
- Hibernate ORM

### External APIs
- [OpenWeatherMap API](https://openweathermap.org/api) — live weather data
- [NewsAPI](https://newsapi.org) — news headlines

---

## 📁 Project Structure
```
weatherpulse/
├── weatherpulse/                  # Spring Boot Backend
│   ├── src/main/java/com/ajeshwar/weatherpulse/
│   │   ├── config/
│   │   │   ├── AppConfig.java
│   │   │   ├── CorsConfig.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── controller/
│   │   │   ├── CityController.java
│   │   │   ├── WeatherController.java
│   │   │   └── NewsController.java
│   │   ├── model/
│   │   │   ├── City.java
│   │   │   ├── WeatherResponse.java
│   │   │   └── NewsResponse.java
│   │   ├── repository/
│   │   │   └── CityRepository.java
│   │   └── service/
│   │       ├── CityService.java
│   │       ├── WeatherService.java
│   │       └── NewsService.java
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                      # React Frontend
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── SearchBar.js
        │   ├── WeatherCard.js
        │   ├── NewsCard.js
        │   └── Loader.js
        ├── pages/
        │   └── Home.js
        └── services/
            └── api.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have these installed:
- Java JDK 17+
- Maven
- MySQL 8.0+
- Node.js 18+
- npm

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ThatipallyAjeshwar/weatherpulse-.git
cd weatherpulse-
```

---

### 2️⃣ Setup MySQL Database

Open MySQL and run:
```sql
CREATE DATABASE weatherpulse_db;
```

---

### 3️⃣ Configure Backend

Open `weatherpulse/src/main/resources/application.properties` and update:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
weather.api.key=YOUR_OPENWEATHER_API_KEY
news.api.key=YOUR_NEWSAPI_KEY
```

---

### 4️⃣ Run the Backend
```bash
cd weatherpulse
./mvnw spring-boot:run
```

Backend runs at: `http://localhost:8080`

---

### 5️⃣ Run the Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔗 API Endpoints

### Weather
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/weather?city={city}` | Get weather by city name |
| GET | `/api/weather/coords?lat={lat}&lon={lon}` | Get weather by coordinates |

### News
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/news?country={country}` | Get top headlines |
| GET | `/api/news/search?keyword={keyword}` | Search news by keyword |

### Cities
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cities` | Get all saved cities |
| GET | `/api/cities/favourites` | Get favourite cities |
| POST | `/api/cities` | Save a new city |
| PUT | `/api/cities/{id}/favourite` | Toggle favourite |
| DELETE | `/api/cities/{id}` | Delete a city |

---

## 📸 Screenshots

> 🔜 Coming soon — will add after deployment

---

## 🌐 Deployment

> 🔜 Coming soon — planning to deploy on:
> - Backend: Railway / Render
> - Frontend: Netlify / Vercel
> - Database: PlanetScale / Railway MySQL

---

## 👨‍💻 Author

**Thatipally Ajeshwar Reddy**
- 🎓 Full Stack Developer | QSpiders Graduate
- 📍 Hyderabad, India
- 💼 [GitHub](https://github.com/ThatipallyAjeshwar)
- 📧 Available for hire

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
import "./styles/App.css";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import StartPage from "./pages/StartPage";
import CityWeather from "./pages/CityWeather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState();

  return (
    <Router>
      <div className="container">
        <div className="App">
          <SearchBar city={city} setCity={setCity} />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/:city"
              element={<CityWeather city={city} setCity={setCity} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

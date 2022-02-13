import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "80b87101d09e6680b800cc06104464b5";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (city !== "") {
        try {
          console.log(city);
          const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=hourly,daily&units=metric&appid=${API_KEY}`
          );
          setData(result.data);
          console.log(result.data);
        } catch (err) {
          return;
        }
      }
    };
    fetchData();
  }, [city]);

  useEffect(() => {
    const getCity = async () => {
      if (query !== "") {
        const getCoords = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        setCityList(getCoords.data);
      }
    };
    getCity();
  }, [query]);

  let timer;
  const handleSubmit = (e) => {
    if (!e.target.value) {
      setCityList([]);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="searchBar">
        <input type="text" placeholder="Your city" onKeyUp={handleSubmit} />
      </div>
      <div className="results">
        {cityList?.map((value, key) => {
          return (
            <button
              key={key}
              className="dataItem"
              onClick={(e) => {
                setCity(value);
              }}
            >
              <p>
                {value.name}, {value.country}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

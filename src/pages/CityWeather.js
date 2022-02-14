import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const CityWeather = ({ city }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (city !== "") {
        try {
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

  return (
    <div>
      <h2 className="city-name"> {city.name}</h2>
      <div className="current-weather"></div>
    </div>
  );
};

export default CityWeather;

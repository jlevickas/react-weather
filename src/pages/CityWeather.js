import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { WbSunny } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import "../styles/CityWeather.css";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const CityWeather = ({ city }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (city !== "") {
        try {
          const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=metric&appid=${API_KEY}`
          );
          setData(result.data);
          console.log(result.data);
        } catch (err) {
          return err;
        }
      }
    };
    fetchData();
  }, [city]);

  return (
    <div className="weather-data">
      <div className="main-city-data">
        <Typography variant="h2">{`${city.name}, ${city.country}`}</Typography>
        <div className="current-weather">
          <Typography variant="h3">
            {`${data?.current.temp} °C` || <p> Loading </p>}
          </Typography>
          <Typography variant="h5">
            {`Feels like ${data?.current.feels_like}` || <p> Loading </p>}
          </Typography>
        </div>
        <WbSunny
          sx={{ fontSize: 200, color: blue[500] }}
          className="weather-icon"
        />
      </div>
      <div></div>
    </div>
  );
};

export default CityWeather;

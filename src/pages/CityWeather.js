import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import {
  WbSunny,
  Cloud,
  Bolt,
  Umbrella,
  AcUnit,
  Storm,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import "../styles/CityWeather.css";
import { TailSpin } from "react-loader-spinner";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const CityWeather = ({ city }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (city !== undefined) {
        try {
          const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely&units=metric&appid=${API_KEY}`
          );
          setData(result.data);
          console.log(result.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [city]);

  console.log(data);

  const getIcon = () => {
    const weatherId = data?.current.weather[0].id.toString();

    if (weatherId === "800") {
      return <WbSunny sx={{ fontSize: 200, color: blue[500] }} />;
    } else if (weatherId.startsWith("80")) {
      return <Cloud sx={{ fontSize: 200, color: blue[500] }} />;
    } else if (weatherId.startsWith("2")) {
      return <Bolt sx={{ fontSize: 200, color: blue[500] }} />;
    } else if (weatherId.startsWith("3") || weatherId.startsWith("5")) {
      return <Umbrella sx={{ fontSize: 200, color: blue[500] }} />;
    } else if (weatherId.startsWith("6")) {
      return <AcUnit sx={{ fontSize: 200, color: blue[500] }} />;
    } else if (weatherId.startsWith("7")) {
      return <Storm sx={{ fontSize: 200, color: blue[500] }} />;
    }
  };

  if (!data) {
    return (
      <div className="loader">
        <TailSpin className="loader" color="#008cff" height={80} width={80} />
      </div>
    );
  }
  return (
    <div className="weather-data">
      <div className="main-city-data">
        <Typography variant="h2">{`${city.name}, ${city.country}`}</Typography>
        <div className="current-weather">
          <Typography variant="h3">{`${data.current.temp}°C`}</Typography>
          <Typography variant="h5">{`Feels like ${data.current.feels_like}`}</Typography>
        </div>
      </div>
      <div className="weather-icon">
        {getIcon()}
        <Typography variant="h6">
          {data.current.weather[0].description}
        </Typography>
      </div>
      <div className="small-data">
        <Typography variant="body2">
          {`Clouds: ${data.current.clouds}
          Humidity: ${data.current.humidity}%
          Pressure: ${data.current.pressure}
          Wind speed: ${data.current.wind_speed}`}
        </Typography>
      </div>
    </div>
  );
};

export default CityWeather;

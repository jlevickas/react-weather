import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  InputAdornment,
  ListItem,
  ListItemText,
  List,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import "../styles/SearchBar.css";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

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
        const getCities = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        setCityList(getCities.data);
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

  const listSuggestions = () => {
    return (
      <List className="resultList">
        {cityList.map((value, index) => {
          return (
            <ListItem
              key={index}
              button
              color="primary"
              onClick={() => {
                setCity(value);
                setCityList([]);
              }}
            >
              <ListItemText primary={`${value.name}, ${value.country}`} />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div className="barContainer">
      <Input
        className="searchBar"
        autoFocus
        color="primary"
        placeholder="Your city"
        onKeyUp={handleSubmit}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
      {cityList.length > 0 ? listSuggestions() : <></>}
    </div>
  );
};

export default SearchBar;

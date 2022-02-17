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
import { Link } from "react-router-dom";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const SearchBar = ({ setCity }) => {
  const [query, setQuery] = useState("");
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const getCity = async () => {
      if (query !== "") {
        const getCities = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        setCityList(getCities.data);
      } else {
        const path = window.location.pathname;
        console.log(path);
        setQuery(path);
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
      <List className="result-list">
        {cityList.map((value, index) => {
          let cityURI = encodeURIComponent(value.name);
          return (
            <Link key={index} to={`/${cityURI}`} className="suggestion-link">
              <ListItem
                button
                color="primary"
                onClick={() => {
                  setCity(value);
                  setCityList([]);
                }}
              >
                <ListItemText primary={`${value.name}, ${value.country}`} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    );
  };

  return (
    <div className="bar-container">
      <Input
        className="search-bar"
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

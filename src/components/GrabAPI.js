import React, { useState, useEffect } from "react";
import { Credentials } from "./Credentials";
import axios from "axios";

const GrabData = () => {
  const [token, setToken] = useState("");
  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    axios(Credentials.url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(Credentials.clientID + ":" + Credentials.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);
      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
      }).then((genreResponse) => {
        const genreList = genreResponse.data.categories.items;
        setGenres(genreList);
        //console.log(genres);
        //const genreList = genreResponse.data.categories.items;
        //genreList.map((item) => console.log(item.id));
      });
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <h2>List of Genres</h2>
      <ul>
        {genres.map((genre) => {
          const { id, name } = genre;
          return (
            <li key={id}>
              <h4>{name}</h4>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GrabData;

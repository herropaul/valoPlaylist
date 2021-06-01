import React, { useState, useEffect } from "react";
import { Credentials } from "./Credentials";
import axios from "axios";

const GrabAlbums = () => {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState("");

  const getAlbums = () => {
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
      setToken(tokenResponse);
      axios("https://api.spotify.com/v1/albums/4Hjqdhj5rh816i1dfcUEaM", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
      }).then((albumResponse) => {
        console.log(albumResponse);
        const albumName = albumResponse.data.name;
        setAlbumName(albumName);
      });
    });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <>
      <h2>GrabAlbums Working</h2>
      <h1>{albumName}</h1>
    </>
  );
};

export default GrabAlbums;

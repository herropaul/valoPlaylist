import React, { useState, useEffect } from "react";
import { Credentials } from "./Credentials";
import axios from "axios";

//Valorant URI: y1l6o99xay9vxht58lt0mpnho

const GrabUserPlaylist = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const playlistIDs = [];
  //const [playlistIDs, setPlaylistIDs] = useState([]);

  const getUserPlaylist = () => {
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
      setToken(tokenResponse.data.access_token);
      axios(
        "https://api.spotify.com/v1/users/y1l6o99xay9vxht58lt0mpnho/playlists",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((userResponse) => {
        const newPlaylists = userResponse.data.items; // array of objects
        setPlaylists(newPlaylists);
        console.log("playlists: ", newPlaylists);
      });
    });
  };

  const getPlaylistIDs = () => {
    playlists.forEach((playlist) => {
      playlistIDs.push(playlist.id);
    });
    console.log(playlistIDs);
  };

  useEffect(() => {
    getUserPlaylist();
    getPlaylistIDs();
  }, []);

  return (
    <>
      <h2>Grabbing Valorants Playlists...</h2>
      <ul>
        {playlists.map((playlist) => {
          const { id, images, name } = playlist;
          const imageURL = images[0].url;
          return (
            <li key={id}>
              <h3>{name}</h3>
              <img src={imageURL} alt="valImage" width="300" height="300" />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GrabUserPlaylist;

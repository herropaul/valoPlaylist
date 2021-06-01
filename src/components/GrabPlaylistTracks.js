import React, { useState, useEffect } from "react";
import { Credentials } from "./Credentials";
import GrabUserPlaylist from "./GrabUserPlaylist";
import axios from "axios";

const GrabPlaylistTracks = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  const getPlaylistTracks = () => {
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
      //console.log("Consoling from GrabPlaylistTracks.js: ", playlistIDs);
      //axios("https://api.spotify.com/v1/playlists/{playlist_id}/tracks");
    });
  };

  useEffect(() => {
    getPlaylistTracks();
  }, []);

  return (
    <>
      <h2>Testing from GrabPlaylistTracks.js</h2>
    </>
  );
};

export default GrabPlaylistTracks;

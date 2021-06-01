import React, { useState, useEffect } from "react";
import GrabData from "./components/GrabAPI";
import GrabAlbums from "./components/GrabAlbums";
import GrabPlaylistTracks from "./components/GrabPlaylistTracks";
import GrabUserPlaylist from "./components/GrabUserPlaylist";
import "./App.css";

// spotify:playlist:3d85NCMHpQWisiEUIDUwN8 Phoenix playlist
// hello sir

const App = () => {
  return (
    <div>
      <GrabUserPlaylist />
      <GrabPlaylistTracks />
    </div>
  );
};

export default App;

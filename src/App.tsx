import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import Album from "./Components/Album";
import Artist from "./Components/Artist";
import axios from "axios";

//constants
const CLIENT_ID = "9ce584ba520242df94bd8fa9ba33d4cd";
const REDIRECT_URI = "https://spotify-searchmg.netlify.app/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  //State definition
  const [token, setToken] = useState<string | boolean | null>("");
  let [search, setSearch] = useState("");
  let [result, setResult] = useState({ artist: "", albums: "", topTracks: "" });
  let [isLoading, setIsLoading] = useState<boolean>(false);

  //Methods & handlers
  useEffect(() => {
    const hash: any = window.location.hash;
    let tokenLS: any = window.localStorage.getItem("token");
    if (!tokenLS && hash) {
      let tokenLS = hash //filtering the hash with strings methods
        .substring(1)
        .split("&")
        .find((elem: any) => elem.startsWith("access_token"))
        .split("=")[1];
      window.localStorage.setItem("token", tokenLS); //localstorage
      window.location.hash = "";
      location.reload();
    }
    setToken(tokenLS);
    setIsLoading(false);
  }, []); //this method is for accessing and storing the token in the hash

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  const handleChange = (event: any): void => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 300);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (search != "") {
      setIsLoading(true);
      const id = await fetchArtistId(search);
      await fetchInfoArtist(id);
      await fetchAlbums(id);
      await fetchArtistTopTracks(id);
      setIsLoading(false);
    }
  }

  const artistReq = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: search,
      type: "artist",
    },
  };

  const fetchArtistId = async (search: any) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/search?type=artist`, artistReq);
    const id: string = data.artists.items[0].uri.split(":")[2];
    return id;
  };

  const fetchAlbums = async (id: string) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums/?limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let albumsData = data.items;
    setResult((result) => ({
      ...result,
      albums: albumsData,
    }));
  };

  const fetchInfoArtist = async (id: string) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let artistData = data;
    setResult((result) => ({
      ...result,
      artist: artistData,
    }));
  };

  const fetchArtistTopTracks = async (id: string) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks/?country=US`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let topTracks = data.tracks;
    setResult((result) => ({
      ...result,
      topTracks: topTracks,
    }));
  };

  //Render
  return (
    <>
      <div className='title-container'>
        <h1>Spotify Search</h1>
        {token != null ? <Form handleChange={handleChange} handleSubmit={handleSubmit} /> : <h2>Please Log in</h2>}
      </div>

      <div className='App-Main'>
        {isLoading ? <h3>Loading..</h3> : []}
        {result.albums.length && result.topTracks.length ? (
          <>
            <Artist artist={result.artist} topTracks={result.topTracks} />
            <Album albums={result.albums} />
          </>
        ) : (
          []
        )}
        {token == null ? (
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </>
  );
}

export default App;

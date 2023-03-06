import { useState, useEffect } from "react";
import Form from "./Components/Form";
import Album from "./Components/Album";
import Artist from "./Components/Artist";
import {getSpotifyToken } from "./Services/auth";
import {
  Iresult,
  fetchArtistId,
  fetchAlbums,
  fetchArtistTopTracks,
  fetchInfoArtist,
} from "./Services/artist";

function App() {
  //State definition
  const [token, setToken] = useState<string | boolean | null>("");
  let [search, setSearch] = useState<string>("");
  let [result, setResult] = useState<Iresult>({
    artist: "",
    albums: "",
    topTracks: "",
  });
  let [isLoading, setIsLoading] = useState<boolean>(false);
  //Methods & handlers
  useEffect(() => {
    const fetchToken = async () => { 
      const tokenCCW= await getSpotifyToken();
      setToken(tokenCCW);
      setIsLoading(false);
      window.location.hash = "";
  }
  fetchToken()
  }, []); //this method is for accessing and storing the token in the hash

  const handleChange = (event: any): void => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 300);
  };

  const artistReq = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: search,
      type: "artist",
    },
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (search != "") {
      setIsLoading(true);
      const id = await fetchArtistId(artistReq);
      await fetchInfoArtist({ id, setResult, result, token });
      await fetchAlbums({ id, setResult, result, token });
      await fetchArtistTopTracks({ id, setResult, result, token });
      setIsLoading(false);
    }
  }
  //Render
  return (
    <>
      <div className="title-container">
        <h1>Spotify Search</h1>
        {token != null ? (
          <Form handleChange={handleChange} handleSubmit={handleSubmit} />
        ) : [] 
        }
      </div>
      <div className="App-Main">
        {isLoading ? <h3>Loading..</h3> : []}
        {result.albums.length && result.topTracks.length ? (
          <>
            <Artist artist={result.artist} topTracks={result.topTracks} />
            <Album albums={result.albums} />
          </>
        ) : (
          []
        )}
      </div>
    </>
  );
}

export default App;

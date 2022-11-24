import axios from "axios";
//Inteface declaration
export interface IartistRequest {
  id: string;
  setResult: Function;
  result: object | undefined;
  token: any;
}
export interface Iresult {
  artist: object | string;
  albums: Array<object> | string;
  topTracks: Array<object> | string;
}

export const fetchArtistId = async (search: string, artistReq: any) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/search?type=artist`, artistReq);
  const id: string = data.artists.items[0].uri.split(":")[2];
  return id;
};

export const fetchAlbums = async ({ id, setResult, token }: IartistRequest) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums/?limit=50`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let albumsData: object = data.items;
  setResult((result: Iresult) => ({
    ...result,
    albums: albumsData,
  }));
};

export const fetchInfoArtist = async ({ id, setResult, token }: IartistRequest) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let artistData: Array<object> = data;
  setResult((result: Iresult) => ({
    ...result,
    artist: artistData,
  }));
};

export const fetchArtistTopTracks = async ({ id, setResult, token }: IartistRequest) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks/?country=US`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  let topTracks: Array<object> = data.tracks;
  setResult((result: Iresult) => ({
    ...result,
    topTracks: topTracks,
  }));
};

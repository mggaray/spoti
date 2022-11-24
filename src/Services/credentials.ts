interface Icredentials {
  CLIENT_ID: string;
  REDIRECT_URI: string;
  AUTH_ENDPOINT: string;
  RESPONSE_TYPE: string;
}

//constants

export const credentials: Icredentials = {
  CLIENT_ID: "9ce584ba520242df94bd8fa9ba33d4cd",
  //const REDIRECT_URI = "https://spotify-searchmg.netlify.app/";
  REDIRECT_URI: "http://localhost:5173",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  RESPONSE_TYPE: "token",
};

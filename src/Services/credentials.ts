interface Icredentials {
  CLIENT_ID: string;
  CLIENT_SECRET:string;
  REDIRECT_URI: string;
  AUTH_ENDPOINT: string;
  RESPONSE_TYPE: string;
}

export const credentials: Icredentials = {
  CLIENT_ID: "9ce584ba520242df94bd8fa9ba33d4cd",
  CLIENT_SECRET:"3521d09a62ac463b93757a5e4b4e1e07",
  //REDIRECT_URI: "https://spotify-searchmg.netlify.app/",
  REDIRECT_URI: "http://localhost:5173",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  RESPONSE_TYPE: "token",
};

import "../sass/index.css";
import Track from "./Track";
import { Itrack } from "../Services/track";

function Artist({ artist, topTracks }: any) {
  let topTracksResult = topTracks.map((trackObject: Itrack, index: number) => {
    return (
      <Track key={index} audio={trackObject.audio} name={trackObject.name} />
    );
  });

  return (
    <>
      <div className="artist-container">
        <h1>{artist.name}</h1>
        <img className="artist-photo" src={artist.images[0].url} />
        <div className="artist-info">
          <p> {`Followers: ${artist.followers.total}`}</p>
          <p>{`Popularity: ${artist.popularity}`}</p>
        </div>
        <div className="tracks-container">
          <h1>Top Tracks</h1>
          <div>{topTracksResult}</div>
        </div>
      </div>
    </>
  );
}

export default Artist;

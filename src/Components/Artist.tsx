import React from "react";
import "../sass/index.css";
function Artist({ artist, topTracks }: any) {
  let topTracksResult = topTracks.map((track: any) => {
    return [
      <h3 key={track}>
        <a href={track.preview_url}>{track.name}</a>{" "}
      </h3>,
    ];
  });

  return (
    <>
      <div className='artist-container'>
        <h1>{artist.name}</h1>
        <img className='artist-photo' src={artist.images[0].url} />
        <div className='artist-info'>
          <p> {`Followers: ${artist.followers.total}`}</p>
          <p>{`Popularity: ${artist.popularity}`}</p>
        </div>
        <div>
          <h1>Top Tracks</h1>
          <div>{topTracksResult}</div>
        </div>
      </div>
    </>
  );
}

export default Artist;

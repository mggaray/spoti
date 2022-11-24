import "../sass/index.css";
function Result({ albums }: any) {
  let albumsFiltrados: any = [];

  albums.forEach((album: any, index: number) => {
    if (index >= 1) {
      if (albums[index - 1].name === album.name) {
      } else if (album.album_group != "appears_on") {
        albumsFiltrados.push(album);
      }
    }
  });

  let result = albumsFiltrados.map((album: any) => {
    return [
      <div key={album}>
        <h3> {album.name}</h3>
        <img src={album.images[0].url}></img>
      </div>,
    ];
  });

  return (
    <div>
      <h1>Albums</h1>
      <div className='result-container'>{result}</div>
    </div>
  );
}

export default Result;

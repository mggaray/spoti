import "../sass/index.css";
interface Ialbum {
  name: string;
  album_group: string;
  images: Array<any>;
}

function Result({ albums }: any) {
  let albumsFiltrados: Array<Ialbum> = [];
  albums.forEach((album: any, index: number) => {
    if (index >= 1) {
      if (albums[index - 1].name === album.name) {
      } else if (
        album.album_group != "appears_on" &&
        album.available_markets.length > 3
      ) {
        albumsFiltrados.push(album);
      }
    }
  });
  console.log(albumsFiltrados);
  let result = albumsFiltrados.map((album: Ialbum) => {
    return [
      <div key={album.name}>
        <h3> {album.name}</h3>
        <img src={album.images[0].url}></img>
      </div>,
    ];
  });

  return (
    <div>
      <h1>Albums</h1>
      <div className="result-container">{result}</div>
    </div>
  );
}

export default Result;

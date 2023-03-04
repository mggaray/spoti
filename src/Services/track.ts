export interface Itrack {
  name: string;
  preview_url: string;
  audio: HTMLAudioElement;
}

export function Previews(tracks: Array<Itrack>) {
  let trackList: Array<any> = [];
  tracks.forEach((track) => {
    let trackElement: Itrack = {
      name: track.name,
      preview_url: track.preview_url,
      audio: new Audio(track.preview_url),
    };
    trackList.push(trackElement);
  });
  return trackList;
}

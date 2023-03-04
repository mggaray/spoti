import { useState } from "react";

function Track({ audio, name }: any) {
  const [msg, setmsg] = useState(">");
  let playing: boolean = false;

  const audioPlayer = (audio: HTMLAudioElement): void => {
    playing = !playing;
    playing == true
      ? (audio.play(), setmsg("||"))
      : (audio.pause(), setmsg(">"));
  };

  return (
    <>
      <div className="track-info">
        <h3>{name}</h3>
        <button onClick={() => audioPlayer(audio)}>{msg}</button>
      </div>
    </>
  );
}

export default Track;

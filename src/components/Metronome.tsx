import { Component, createEffect, createSignal } from "solid-js";
import { beep } from "../lib/audio";
import useMetronome from "../lib/useMetronome";
import styles from "./Metronome.module.css";

const Metronome: Component = () => {
  const { beat, tempo, start, stop, changeTempo, isRunning } = useMetronome();

  const [light, setLight] = createSignal(false);
  const [displayedTempo, setDisplayedTempo] = createSignal(tempo());

  createEffect(
    (previousBeat) => {
      if (!isRunning()) return;
      if (previousBeat === 4) beep(100, 792, 1);
      else beep(100, 600, 1);

      setLight(true);
      setTimeout(() => setLight(false), 100);
      return beat();
    },
    0,
    { name: "onBeat" }
  );

  return (
    <div>
      <h1>Solid Metronome</h1>
      <div class={styles["light-container"]}>
        <div class={styles["light-track"]}>
          <div
            classList={{
              [styles.light]: true,
              [styles.on]: true,
              [styles["second-beat"]]: beat() % 2 === 1,
            }}
          />
        </div>
      </div>
      <p>Beat: {beat()} </p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <p>Tempo: {displayedTempo()}</p>
      <input
        type="range"
        min="30"
        max="240"
        value={displayedTempo()}
        onInput={(e) => {
          setDisplayedTempo(e.currentTarget.valueAsNumber);
        }}
        onChange={(e) => {
          changeTempo(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};

export default Metronome;

import { createSignal } from "solid-js";

export default () => {
  const [beat, setBeat] = createSignal(0);
  const [tempo, setTempo] = createSignal(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = createSignal(4);

  const [intervalId, setIntervalId] = createSignal(0);

  const isRunning = () => intervalId() !== 0;

  const start = () => {
    if (isRunning()) return;

    if (beat() >= beatsPerMeasure()) setBeat(1);
    else setBeat(beat() + 1);

    const interval = 60_000 / tempo();
    document.documentElement.style.setProperty(
      "--interval-time",
      `${Math.floor(interval)}ms`
    );
    setIntervalId(
      setInterval(() => {
        if (beat() >= beatsPerMeasure()) setBeat(1);
        else setBeat(beat() + 1);
      }, interval)
    );
  };

  const stop = () => {
    clearInterval(intervalId());
    setIntervalId(0);
  };

  const changeTempo = (tempo: number) => {
    setTempo(tempo);

    if (isRunning()) {
      stop();
      start();
    }
  };

  return {
    beat,
    tempo,
    start,
    stop,
    changeTempo,
    isRunning,
  };
};

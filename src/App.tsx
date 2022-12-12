import type { Component } from 'solid-js';

import styles from './App.module.css';
import Metronome from './components/Metronome';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Metronome />
    </div>
  );
};

export default App;

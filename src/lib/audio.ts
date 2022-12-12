// Thank you to Carlos Delgado at https://ourcodeworld.com/articles/read/1627/how-to-easily-generate-a-beep-notification-sound-with-javascript

const myAudioContext = new AudioContext();

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 *
 * @param duration - The duration of the beep sound in milliseconds.
 * @param frequency - The frequency of the beep sound.
 * @param volume - The volume of the beep sound.
 *
 * @returns {Promise} - A promise that resolves when the beep sound is finished.
 */
export function beep(
  duration?: number,
  frequency?: number,
  volume?: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Set default duration if not provided
    duration = duration || 200;
    frequency = frequency || 440;
    volume = volume || 20;

    try {
      let oscillatorNode = myAudioContext.createOscillator();
      let gainNode = myAudioContext.createGain();
      oscillatorNode.connect(gainNode);

      // Set the oscillator frequency in hertz
      oscillatorNode.frequency.value = frequency;

      // Set the type of oscillator
      oscillatorNode.type = "square";
      gainNode.connect(myAudioContext.destination);

      // Set the gain to the volume
      gainNode.gain.value = volume * 0.01;

      // Start audio with the desired duration
      oscillatorNode.start(myAudioContext.currentTime);
      oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);

      // Resolve the promise when the sound is finished
      oscillatorNode.onended = () => {
        resolve();
      };
    } catch (error) {
      reject(error);
    }
  });
}

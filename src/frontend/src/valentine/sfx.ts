/**
 * Sound Effects Module
 * 
 * Generates a cute success sound using Web Audio API.
 * No external audio files needed - synthesized in-browser.
 */
export function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a sweet ascending tone sequence
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    const duration = 0.15;
    
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      
      // Envelope: quick attack, gentle decay
      const startTime = audioContext.currentTime + index * duration;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  } catch (error) {
    // Silently fail if Web Audio API is not supported
    console.log('Audio not supported');
  }
}

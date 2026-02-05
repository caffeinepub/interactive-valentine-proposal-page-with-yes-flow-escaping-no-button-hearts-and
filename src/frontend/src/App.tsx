import { useState, useEffect } from 'react';
import HeartsBackground from './valentine/HeartsBackground';
import ConfettiBurst from './valentine/ConfettiBurst';
import { useEscapingButton } from './valentine/useEscapingButton';
import { playSuccessSound } from './valentine/sfx';
import { Heart } from 'lucide-react';

/**
 * Main Valentine Proposal App
 * 
 * State flow:
 * 1. "initial" - Shows the question and YES/NO buttons
 * 2. "celebrating" - Shows confetti burst and meme image
 * 3. "final" - Shows the static photo with final message
 */
function App() {
  // UI state machine: initial -> celebrating -> final
  const [stage, setStage] = useState<'initial' | 'celebrating' | 'final'>('initial');
  
  // Controls the entrance animation on mount
  const [isVisible, setIsVisible] = useState(false);
  
  // Manages confetti animation trigger
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Escaping NO button behavior
  const { buttonStyle, handleMouseEnter, handlePointerMove, yesButtonRef } = useEscapingButton();

  // Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle YES button click
  const handleYesClick = () => {
    // Play cute sound effect
    playSuccessSound();
    
    // Trigger confetti
    setShowConfetti(true);
    
    // Transition to celebration stage
    setStage('celebrating');
    
    // After showing meme, transition to final stage with static photo
    setTimeout(() => {
      setStage('final');
    }, 3000);
  };

  return (
    <div className="valentine-container">
      {/* Floating hearts background */}
      <HeartsBackground />
      
      {/* Confetti burst on YES click */}
      {showConfetti && <ConfettiBurst />}

      {/* Initial proposal stage */}
      {stage === 'initial' && (
        <div className={`proposal-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="proposal-question">
            Will you be my Valentine, Suzanne The Nazareth?
          </h1>
          
          <div className="buttons-container">
            {/* YES button - prominent and attractive */}
            <button
              ref={yesButtonRef}
              onClick={handleYesClick}
              className="yes-button"
              aria-label="Yes"
            >
              <Heart className="heart-icon" fill="currentColor" />
              YES
            </button>
            
            {/* NO button - escapes on hover/proximity */}
            <button
              onMouseEnter={handleMouseEnter}
              onPointerMove={handlePointerMove}
              style={buttonStyle}
              className="no-button"
              aria-label="No"
            >
              NO
            </button>
          </div>
        </div>
      )}

      {/* Celebration stage - show meme */}
      {stage === 'celebrating' && (
        <div className="celebration-content visible">
          <div className="meme-container">
            <img
              src="/assets/generated/valentine-meme.dim_1200x800.png"
              alt="Good choice"
              className="meme-image"
            />
            <p className="celebration-text">Good choice ❤️</p>
          </div>
        </div>
      )}

      {/* Final stage - show static photo */}
      {stage === 'final' && (
        <div className="final-content visible">
          <div className="final-image-container">
            <img
              src="/assets/aman_suz_pic.jpeg"
              alt="Our special moment"
              className="final-image"
            />
          </div>
          <p className="final-message">
            I knew you'd say yes 💕
          </p>
          <p className="final-signature">
            Made with love, just for you.
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="valentine-footer">
        <p>© 2026. Built with <Heart className="footer-heart" size={14} fill="currentColor" /> using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer">caffeine.ai</a></p>
      </footer>
    </div>
  );
}

export default App;

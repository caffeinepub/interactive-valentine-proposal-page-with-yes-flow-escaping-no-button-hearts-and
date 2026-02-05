import { useState, useRef, useCallback } from 'react';

/**
 * useEscapingButton Hook
 * 
 * Manages the playful "escaping NO button" behavior.
 * On hover or pointer proximity, the button moves to a random safe position
 * that stays within viewport and avoids overlapping the YES button.
 */
export function useEscapingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate a safe random position for the NO button
  const getRandomPosition = useCallback(() => {
    const padding = 20;
    const buttonWidth = 120;
    const buttonHeight = 50;
    
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = padding + Math.random() * (maxY - padding);
      attempts++;

      // Check if position overlaps with YES button
      if (yesButtonRef.current) {
        const yesRect = yesButtonRef.current.getBoundingClientRect();
        const noRect = {
          left: newX,
          right: newX + buttonWidth,
          top: newY,
          bottom: newY + buttonHeight,
        };

        const overlaps = !(
          noRect.right < yesRect.left ||
          noRect.left > yesRect.right ||
          noRect.bottom < yesRect.top ||
          noRect.top > yesRect.bottom
        );

        if (!overlaps) break;
      } else {
        break;
      }
    } while (attempts < maxAttempts);

    return { x: newX, y: newY };
  }, []);

  // Handle mouse hover
  const handleMouseEnter = useCallback(() => {
    const newPos = getRandomPosition();
    setPosition(newPos);
  }, [getRandomPosition]);

  // Handle pointer/touch proximity
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const proximityThreshold = 50;

      const distance = Math.sqrt(
        Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
        Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
      );

      if (distance < proximityThreshold) {
        const newPos = getRandomPosition();
        setPosition(newPos);
      }
    },
    [getRandomPosition]
  );

  const buttonStyle: React.CSSProperties = {
    position: position.x !== 0 || position.y !== 0 ? 'fixed' : 'relative',
    left: position.x !== 0 ? `${position.x}px` : undefined,
    top: position.y !== 0 ? `${position.y}px` : undefined,
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return {
    buttonStyle,
    handleMouseEnter,
    handlePointerMove,
    yesButtonRef,
  };
}

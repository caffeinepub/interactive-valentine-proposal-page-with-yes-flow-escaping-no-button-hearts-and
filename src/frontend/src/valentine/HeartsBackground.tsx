/**
 * HeartsBackground Component
 * 
 * Renders continuously floating hearts in the background using pure CSS animations.
 * Hearts are positioned absolutely and animate upward with slight horizontal drift.
 */
function HeartsBackground() {
  // Generate 15 hearts with randomized positions and animation delays
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${8 + Math.random() * 6}s`,
    size: 20 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="hearts-background" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

export default HeartsBackground;

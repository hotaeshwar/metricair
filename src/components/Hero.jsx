// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.preload = 'auto';

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        const enablePlay = async () => {
          try {
            await video.play();
            document.removeEventListener('click', enablePlay);
            document.removeEventListener('touchstart', enablePlay);
          } catch (err) {
            console.log('Video play failed:', err);
          }
        };
        document.addEventListener('click', enablePlay, { once: true });
        document.addEventListener('touchstart', enablePlay, { once: true });
      }
    };

    video.addEventListener('canplaythrough', () => setTimeout(tryPlay, 300), { once: true });
    video.load();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black
      h-[60vh] min-h-[300px]
      sm:h-[65vh] sm:min-h-[400px]
      md:h-[70vh] md:min-h-[500px]
      lg:h-screen lg:min-h-[600px]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/images/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};

export default Hero;
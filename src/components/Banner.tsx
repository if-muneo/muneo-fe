import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';

const BannerContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  aspect-ratio: 3800 / 1040;
`;

const BannerImage = styled(motion.div)<{ bgImage: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${props => props.bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
`;

interface BannerProps {
  autoSlideInterval?: number;
}

const banners = [
  {id: 1, image: banner1, url: 'https://www.lguplus.com/benefit-event/ongoing/81765'},
  {id: 2, image: banner2, url: 'https://www.lguplus.com/ujam/126?tab=tabcontent02'},
  {id: 3, image: banner3, url: 'https://www.lguplus.com/benefit-event/ongoing/81773'}
];

const Banner: React.FC<BannerProps> = ({ autoSlideInterval = 3000 }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, autoSlideInterval);
    
    return () => clearInterval(timer);
  }, [autoSlideInterval, isPaused]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 1,
        zIndex: 1
      };
    },
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 1,
        zIndex: 0
      };
    }
  };

  return (
    <BannerContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <BannerImage
          key={currentBanner}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          bgImage={banners[currentBanner].image}
          onClick={() => window.open(banners[currentBanner].url, '_blank')}
          style={{ cursor: 'pointer' }}
        />
      </AnimatePresence>
    </BannerContainer>
  );
};

export default Banner;
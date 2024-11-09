import { useState, useEffect } from 'react';

const useLandingPage = (duration: number) => {
  const [isLandingVisible, setIsLandingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLandingVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLandingVisible;
};

export default useLandingPage;

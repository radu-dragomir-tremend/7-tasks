import { useEffect, useRef, useState } from 'react';
import { STEP } from './constants';

export const useTimer = () => {
  const [duration, setDuration] = useState(15);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean | null>(null);
  const intervalRef = useRef<any>();

  const startTimer = () => {
    setIsTimerActive(true);

    return setInterval(() => {
      setCurrentTime((prevTime) => Math.round((prevTime + STEP) * 10) / 10);
    }, 1000 * STEP);
  };

  useEffect(() => {
    intervalRef.current = startTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTimerActive && currentTime >= duration) {
      clearInterval(intervalRef.current);
      setIsTimerActive(false);
    }
    if (isTimerActive === false && currentTime < duration) {
      intervalRef.current = startTimer();
    }
  }, [isTimerActive, currentTime, duration]);

  return [duration, setDuration, currentTime, setCurrentTime] as const;
};

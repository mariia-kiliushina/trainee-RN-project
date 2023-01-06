import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const useTimer = (timerSec: number) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>();
  const terminateTimeRef = useRef(Date.now() + timerSec * 1000);

  const [time, setTime] = useState(timerSec);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(prevTimer => prevTimer - 1);
    }, 1000);
  };

  const resetTime = () => {
    console.log('inside timer');
    stopTimer();
    terminateTimeRef.current = Date.now() + timerSec * 1000;
    setTime(timerSec);
    startTimer();
  };

  const appStateOnChange = useCallback((nextState: AppStateStatus) => {
    stopTimer();

    if (nextState === 'active') {
      const timeLeft = Math.round(
        (terminateTimeRef.current - Date.now()) / 1000,
      );

      if (timeLeft > 0) {
        setTime(timeLeft);

        startTimer();
      } else {
        setTime(0);
      }
    }
  }, []);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      appStateOnChange,
    );

    startTimer();

    return () => {
      appStateSubscription.remove();
      stopTimer();
    };
  }, [appStateOnChange]);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
    }
  }, [time]);

  return {time, resetTime};
};

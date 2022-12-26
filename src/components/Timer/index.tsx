import {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, AppStateStatus, AppState} from 'react-native';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';

type TProps = {
  time: number;
};

export const useTimer = (timerSec: number) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>();
  const terminateTimeRef = useRef(Date.now() + timerSec * 1000);

  const [timer, setTimer] = useState(timerSec);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
  };

  const resetTimer = () => {
    stopTimer();
    terminateTimeRef.current = Date.now() + timerSec * 1000;
    setTimer(timerSec);
    startTimer();
  };

  const appStateOnChange = useCallback((nextState: AppStateStatus) => {
    stopTimer();

    if (nextState === 'active') {
      const timeLeft = Math.round(
        (terminateTimeRef.current - Date.now()) / 1000,
      );

      if (timeLeft > 0) {
        setTimer(timeLeft);

        startTimer();
      } else {
        setTimer(0);
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
    if (timer === 0) {
      stopTimer();
    }
  }, [timer]);

  return {timer, resetTimer};
};

export const Timer = ({time}: TProps) => {
  const {timer, resetTimer} = useTimer(time);

  return (
    <View>
      <Typography variant="24" textStyle={styles.textStyle}>
        {`${timer}s`}
      </Typography>
      <View style={styles.buttonsWrapper}>
        <Button
          disabled={!!timer}
          type="secondary"
          style={styles.buttonStyle}
          onPress={resetTimer}
        >
          Resend OTP
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonStyle: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});

import {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, AppStateStatus, AppState} from 'react-native';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';

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

export const Timer = () => {
  const {timer, resetTimer} = useTimer(8);

  return (
    <Container style={styles.style} contentLayout={styles.contentLayout}>
      <Typography variant="24" textStyle={styles.textStyle}>
        {`${timer}s`}
      </Typography>

      <View style={styles.buttonsWrapper}>
        <Button
          disabled={!!timer}
          type="secondary"
          style={[styles.buttonStyle, {marginRight: 40}]}
          onPress={resetTimer}
        >
          Resend OTP
        </Button>
        <Button type="primary" style={styles.buttonStyle}>
          Continue
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.genericWhite,
  },
  contentLayout: {
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  buttonStyle: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});

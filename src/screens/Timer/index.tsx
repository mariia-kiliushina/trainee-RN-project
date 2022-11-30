import {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, AppStateStatus, AppState} from 'react-native';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';

const useTimer: (initialTime: number) => {
  countdownTime: number;
  restart: () => void;
} = initialTime => {
  ///
  const [time, setTime] = useState(Math.abs(initialTime));
  const intervalRef = useRef(null);

  const [hasTimeBeenAdjusted, setHasTimeBeenAdjusted] = useState(false);
  const [timestampOut, setTimestampOut] = useState(0);
  const [timestampIn, setTimestampIn] = useState(0);

  useEffect(() => {
    // intervalRef.current = setInterval(() => {}, 1000);
    //   const listener = AppState.addEventListener('change', () => {});
    // return () => listener.remove();
  }, []);

  /////

  const restart = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  const getTimeInTheBackground = () => {
    if (timestampIn && timestampIn > timestampOut) {
      let timeInTheBackground = (timestampIn - timestampOut) / 1000;
      return Math.round(timeInTheBackground);
    } else {
      return 0;
    }
  };

  const timeInTheBackground = getTimeInTheBackground();

  useEffect(() => {
    console.log('time');
    if (refTime.current > 0) {
      const id = setInterval(() => {
        if (hasTimeBeenAdjusted) {
          refTime.current -= 1;
        } else {
          refTime.current = refTime.current - timeInTheBackground;
          setHasTimeBeenAdjusted(true);
        }

        setTime(refTime.current < 0 ? 0 : refTime.current);
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [refTime, timeInTheBackground, hasTimeBeenAdjusted]);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      if (state === 'active') {
        setTimestampIn(Date.now());
      } else {
        setTimestampOut(Date.now());
        setHasTimeBeenAdjusted(false);
      }
    };

    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [timestampOut]);

  return {countdownTime: refTime.current, restart};
};

export const Timer = () => {
  const {countdownTime, restart} = useTimer(10);

  const isRestartDisabled = countdownTime > 0 ? true : false;

  return (
    <Container style={styles.style} contentLayout={styles.contentLayout}>
      <Typography variant="24" textStyle={styles.textStyle}>
        {`${countdownTime}s`}
      </Typography>

      <View style={styles.buttonsWrapper}>
        <Button
          disabled={isRestartDisabled}
          type="secondary"
          style={[styles.buttonStyle, {marginRight: 40}]}
          onPress={restart}
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

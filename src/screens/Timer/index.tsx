import {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';

export const Timer = () => {
  //
  const useTimer: (initialTime: number) => {
    refTime: number;
    restart: () => void;
  } = initialTime => {
    const positiveTime = initialTime < 0 ? 0 : initialTime;

    const [time, setTime] = useState(positiveTime);
    let refTime = useMemo(() => ({current: time}), [time]);

    useEffect(() => {
      if (refTime.current > 0) {
        const id = setInterval(() => {
          refTime.current -= 1;
          setTime(refTime.current);
        }, 1000);
        return () => clearInterval(id);
      }
    }, [refTime]);

    const restart = useCallback(() => {
      setTime(initialTime);
    }, [initialTime]);

    return {refTime: refTime.current, restart};
  };

  const {refTime, restart} = useTimer(8);

  const isRestartDisabled = refTime > 0 ? true : false;

  return (
    <Container style={styles.style} contentLayout={styles.contentLayout}>
      <Typography variant="24" textStyle={styles.textStyle}>
        {`${refTime}s`}
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

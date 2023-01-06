import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {ModalOverlay} from 'src/components/ModalOverlay';
import {RootStackScreenProps} from 'src/navigation/types';
import {useTimer} from 'src/hooks/useTimer';
import {useNavigation} from '@react-navigation/native';
import {TimeCounter} from 'src/components/TimeCounter';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {useState} from 'react';
import {Backspace} from 'src/assets/svg';

const otpRegExp = /^[0-9]{0,6}$/;

export const OtpModal = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'BottomSheetModal'>['navigation']>();

  const [otpCode, setOtpCode] = useState('');

  const {time, resetTime} = useTimer(5);

  const onContinue = (code: string) => {
    navigation.goBack();
    navigation.navigate('Bills', {code});
  };

  const onResendOTP = () => {
    resetTime();
    setOtpCode('');
  };

  const selectOnPress = (item: number | null | string) => {
    if (item === 'delete') {
      setOtpCode(otpCode.slice(0, -1));
    }
    if (item) {
      if (otpRegExp.test(otpCode + item.toString())) {
        setOtpCode(otpCode + item.toString());
      }
    }
    return;
  };

  return (
    <ModalOverlay variant="bottom" background="transparent">
      <View style={styles.header}>
        <Typography style={styles.header} variant="24" textStyle={styles.text}>
          Enter OTP
        </Typography>
      </View>
      <View style={styles.container}>
        <Typography textStyle={styles.textStyle}>
          {'OTP has been sent to\n the registered phone number'}
        </Typography>
        <Input
          style={styles.inputText}
          showSoftInputOnFocus={false}
          value={otpCode.toString()}
        />
        <TimeCounter time={time} />

        <View style={styles.buttonWrapper}>
          <Button
            type="secondary"
            disabled={!!time}
            onPress={onResendOTP}
            style={styles.button}
          >
            resend OTP
          </Button>
          <Button
            type="primary"
            disabled={otpCode.length < 6}
            onPress={() => onContinue(otpCode)}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </View>
      <View style={styles.bottomLine} />
      <View style={styles.numButtonsWrapper}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'delete'].map(item => (
          <Pressable
            key={item}
            style={({pressed}) => [styles.numButton, pressed && styles.pressed]}
            onPress={() => selectOnPress(item)}
          >
            {item === 'delete' && <Backspace height={30} />}
            {item !== 'delete' && <Typography variant="40">{item}</Typography>}
          </Pressable>
        ))}
      </View>
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.warning500,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    color: COLORS.genericWhite,
    fontSize: 16,
    marginVertical: 10,
  },
  container: {
    padding: 20,
  },
  textStyle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  inputText: {
    fontSize: 24,
    letterSpacing: 5,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginBottom: 0,
  },
  numButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: 20,
  },
  bottomLine: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.neutral300,
  },
  numButton: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});

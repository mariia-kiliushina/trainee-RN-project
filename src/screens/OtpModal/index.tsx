import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {RootStackScreenProps} from 'src/navigation/types';
import {useTimer} from 'src/hooks/useTimer';
import {useNavigation} from '@react-navigation/native';
import {TimeCounter} from 'src/components/TimeCounter';
import {Button} from 'src/components/Button';
import {useState} from 'react';
import {Backspace} from 'src/assets/svg';

const buttonsArray = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  null,
  '0',
  'delete',
];

export const OtpModal = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'OtpModal'>['navigation']>();

  const [otpCode, setOtpCode] = useState('');

  const {time, resetTime} = useTimer(5);

  const onContinue = () => {
    navigation.goBack();
    navigation.navigate('Bills');
  };

  const onResendOTP = () => {
    resetTime();
    setOtpCode('');
  };

  const selectOnPress = (item: number | null | string) => {
    if (item === 'delete') {
      setOtpCode(prevOtpCode => prevOtpCode.slice(0, -1));
    }
    if (item) {
      if (otpCode.length < 6) {
        setOtpCode(prevOtpCode => prevOtpCode + item);
      }
    }
    return;
  };

  return (
    <View style={styles.flex}>
      <Pressable onPress={navigation.goBack} style={styles.pressable} />
      <View style={styles.background}>
        <View style={styles.header}>
          <Typography
            style={styles.header}
            variant="24"
            textStyle={styles.headerText}
          >
            Enter OTP
          </Typography>
        </View>
        <View style={styles.contentContainer}>
          <Typography textStyle={styles.generalText}>
            {'OTP has been sent to\n the registered phone number'}
          </Typography>

          <Typography variant="36" textStyle={styles.codeText}>
            {otpCode}
          </Typography>

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
              onPress={onContinue}
              style={styles.button}
            >
              Continue
            </Button>
          </View>
        </View>
        <View style={styles.bottomLine} />
        <View style={styles.numButtonsWrapper}>
          {buttonsArray.map(item => (
            <Pressable
              key={item}
              style={({pressed}) => [
                styles.numButton,
                pressed && styles.pressed,
              ]}
              onPress={() => selectOnPress(item)}
            >
              {item === 'delete' && <Backspace height={30} />}
              {item !== 'delete' && (
                <Typography variant="40">{item}</Typography>
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: COLORS.genericWhite,
    flex: 1,
  },
  pressable: {
    height: '20%',
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.warning500,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: COLORS.genericWhite,
    fontSize: 16,
    marginVertical: 10,
  },
  contentContainer: {
    padding: 20,
  },
  generalText: {
    marginBottom: 10,
    textAlign: 'center',
  },

  codeText: {
    fontSize: 24,
    height: 50,
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

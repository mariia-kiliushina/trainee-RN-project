import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {InputNumeric} from 'src/components/InputNumeric';
import {Typography} from 'src/components/Typography';

import {COLORS} from 'src/constants/colors';

const ACCOUNT = 'Account Number';
const PASSWORD = 'Password';
const INPUT = 'Input';

export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <View>
        <Input label={INPUT} placeholder="Input" />
        <Input label={INPUT} type="disabled" placeholder="Input" />
        <Input
          label={INPUT}
          type="error"
          errorText="Value does not exist"
          placeholder="Input"
        />
      </View>
      <View>
        <InputPassword label={PASSWORD} />
        <InputPassword label={PASSWORD} type="disabled" />
        <InputPassword
          label={PASSWORD}
          type="error"
          errorText="Password is incorrect"
        />
      </View>
      <View>
        <InputNumeric label={ACCOUNT} placeholder="Enter your account number" />
        <InputNumeric
          label={ACCOUNT}
          type="disabled"
          placeholder="Enter your account number"
        />

        <InputNumeric
          label={PASSWORD}
          type="error"
          errorText="Account number is incorrect"
          placeholder="Enter your account number"
        />
      </View>
      <Pressable onPress={onNavigate} style={styles.button}>
        <Typography variant="18" fontType="regular" color={'white'}>
          Go to another screen
        </Typography>
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  columnsLayout: {flexDirection: 'row'},
  button: {
    marginTop: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 'auto',
    height: 44,
    width: '70%',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.warning500,
    borderRadius: 6,
    alignItems: 'center',
  },
});

import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Container} from 'src/components/Container';
import {InputAccount} from 'src/components/InputAccount';
import {InputPassword} from 'src/components/InputPassword';
import {Typography} from 'src/components/Typography';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ACCOUNT = 'Account Number';
const PASSWORD = 'Password';
export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <KeyboardAwareScrollView>
        <View>
          <InputAccount label={ACCOUNT} />
          <InputAccount label={ACCOUNT} type="disabled" />
          <InputAccount label={ACCOUNT} type="error" />
          <InputAccount
            label={ACCOUNT}
            type="error"
            errorText="Account number does not exist"
          />
        </View>
        <View>
          <InputPassword label={PASSWORD} />
          <InputPassword label={PASSWORD} type="disabled" />
          <InputPassword label={PASSWORD} type="error" />
          <InputPassword
            label={PASSWORD}
            type="error"
            errorText="Password is incorrect"
          />
        </View>
        <Pressable onPress={onNavigate} style={styles.button}>
          <Typography variant="18" fontType="regular" color={'white'}>
            Go to another screen
          </Typography>
        </Pressable>
      </KeyboardAwareScrollView>
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
    width: '50%',
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 6,
    alignItems: 'center',
  },
});

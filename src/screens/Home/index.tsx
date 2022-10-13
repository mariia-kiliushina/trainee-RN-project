import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
import {Typography} from 'src/components/Typography';
// import {Typography} from 'src/components/Typography';

export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <Input type="focused" />
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
  button: {
    marginTop: 'auto',
    width: '50%',
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 6,
    alignItems: 'center',
  },
});

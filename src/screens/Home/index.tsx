import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Container} from 'src/components/Container';
import {COLORS} from 'constants/colors';

export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <View>Home</View>
      <Pressable onPress={onNavigate}>Another screen</Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
  },
});

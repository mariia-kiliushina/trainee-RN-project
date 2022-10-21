import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Container} from 'src/components/Container';

import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {Pressable, StyleSheet} from 'react-native';

export const Budget = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <Typography>Budget</Typography>

      <Pressable onPress={onNavigate} style={styles.button}>
        <Typography variant="18" fontType="regular" color={COLORS.base000}>
          Go to another screen
        </Typography>
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.base000,
  },
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

import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = {
  title: string;
  body: string;
};

export const FlatListItem = ({title, body}: Props) => {
  return (
    <Pressable style={({pressed}) => [styles.main, pressed && styles.pressed]}>
      <Typography fontType="bold" variant="18">
        {title}
      </Typography>
      <Typography fontType="regular" variant="14">
        {body}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.violet20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});

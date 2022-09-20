import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = {
  item: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
};

export const FlatListItem = ({item}: Props) => {
  const {title, body} = item;
  return (
    <Pressable style={styles.main}>
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
});

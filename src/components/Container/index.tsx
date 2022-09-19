import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type styledProps = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

export const Container = ({children, style}: Props) => {
  const insets = useSafeAreaInsets();
  return <View style={[styles(insets).layout, style]}>{children}</View>;
};

const styles = (insets: styledProps) =>
  StyleSheet.create({
    layout: {
      paddingTop: insets.top,
      flex: 1,
      paddingHorizontal: 20,
    },
  });

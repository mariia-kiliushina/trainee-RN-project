import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

type styledProps = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

export const Layout = ({children}: Props) => {
  const insets = useSafeAreaInsets();
  return <View style={styles(insets).layout}>{children}</View>;
};

const styles = (insets: styledProps) =>
  StyleSheet.create({
    layout: {
      paddingTop: insets.top,
      flex: 1,
    },
  });

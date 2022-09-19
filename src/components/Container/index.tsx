import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({children, style}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.layout, {paddingTop: insets.top}, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

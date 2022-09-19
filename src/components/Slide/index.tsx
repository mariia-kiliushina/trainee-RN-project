import React from 'react';
import {Image, View, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Slide = ({style}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.layout, style]}>
      <Image source={require('./img/holding-money.png')} />
      <Image source={require('./img/rolled-paper.png')} />
      <Image source={require('./img/plan.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

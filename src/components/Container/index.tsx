import React, {ReactNode} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({children, style}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{paddingTop: insets.top}, style]}>
      <ScrollView contentContainerStyle={styles.layout}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

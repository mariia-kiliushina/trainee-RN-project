import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({children, style}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={[{paddingTop: insets.top}, styles.layout, style]}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

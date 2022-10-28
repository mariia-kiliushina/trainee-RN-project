import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'constants/colors';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({children, style}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView enableOnAndroid style={styles.background}>
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
  background: {backgroundColor: COLORS.base000},
});

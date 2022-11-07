import {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'src/constants/colors';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentLayout?: StyleProp<ViewStyle>;
};

export const Container = ({children, style, contentLayout}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{paddingTop: insets.top}, styles.default, style]}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={styles.layout}
        contentContainerStyle={contentLayout}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: COLORS.genericWhite,
  },
  layout: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

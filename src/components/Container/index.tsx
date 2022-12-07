import {ReactNode} from 'react';
import {StyleProp, StyleSheet, SafeAreaView, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'src/constants/colors';
import {ConditionalWrapper} from 'src/helpers/conditionalWrapper';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentLayout?: StyleProp<ViewStyle>;
  hasKeyboardAwareScrollView?: boolean;
};

export const Container = ({
  children,
  style,
  contentLayout,
  hasKeyboardAwareScrollView = true,
}: Props) => {
  const insets = useSafeAreaInsets();

  const renderKeyboardAwareScrollView = (wrapperChildren: ReactNode) => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={[styles.contentContainerStyle, contentLayout]}
      >
        {wrapperChildren}
      </KeyboardAwareScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[{paddingTop: insets.top}, styles.safeAreaStyle, style]}
    >
      <ConditionalWrapper
        condition={hasKeyboardAwareScrollView}
        wrapper={(wrapperChildren: ReactNode) =>
          renderKeyboardAwareScrollView(wrapperChildren)
        }
      >
        <>{children}</>
      </ConditionalWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  safeAreaStyle: {
    backgroundColor: COLORS.genericWhite,
    flexGrow: 1,
  },
});

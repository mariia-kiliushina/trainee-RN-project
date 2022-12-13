import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ConditionalWrapper} from 'src/helpers/conditionalWrapper';

export type ContainerProps = {
  children: React.ReactNode[] | React.ReactNode;
  viewType?: 'fixed' | 'scroll';
  style?: StyleProp<ViewStyle>;
  contentLayout?: StyleProp<ViewStyle>;
  edges?: Edge[];
};

export const Container = ({
  children,
  viewType = 'scroll',
  style,
  contentLayout,
  edges = ['top', 'right', 'left'],
}: ContainerProps) => {
  const Wrapper = viewType === 'scroll' ? SafeAreaView : View;

  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <ConditionalWrapper
        condition={viewType === 'scroll'}
        wrapper={(wrapperChildren: React.ReactNode) => (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.wrapper}
            enableOnAndroid
          >
            {wrapperChildren}
          </KeyboardAwareScrollView>
        )}
      >
        <Wrapper
          edges={['bottom']}
          style={[styles.contentContainer, contentLayout]}
        >
          <>{children}</>
        </Wrapper>
      </ConditionalWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.genericWhite,
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    flexGrow: 1,
  },
});

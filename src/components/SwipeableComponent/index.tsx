import {forwardRef, Ref} from 'react';
import {StyleSheet, View} from 'react-native';
import Swipeable, {
  SwipeableProps,
} from 'react-native-gesture-handler/Swipeable';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

const PADDING_HORIZONTAL = 20;

type TProps = SwipeableProps & {
  title: string;
  body: string;
  renderRightActions?: any;
  onSwipeableWillOpen?: any;
};
export const SwipeableComponent = forwardRef(
  (props: TProps, ref: Ref<Swipeable> | undefined) => {
    const {title, body, onSwipeableWillOpen} = props;

    return (
      <Swipeable
        ref={ref}
        onSwipeableWillOpen={onSwipeableWillOpen}
        containerStyle={styles.containerStyle}
        overshootRight={false}
        {...props}
      >
        <View style={styles.rowVisible}>
          <Typography numberOfLines={1} variant="18" fontType="bold">
            {title}
          </Typography>
          <Typography numberOfLines={2} variant="16">
            {body}
          </Typography>
        </View>
      </Swipeable>
    );
  },
);

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
  rowVisible: {
    backgroundColor: COLORS.genericWhite,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
});

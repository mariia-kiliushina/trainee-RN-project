import {StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {PressableIcon} from '../PressableIcon';

const PADDING_HORIZONTAL = 20;

type TRightActionProps = {
  onNavigateToPopUpModal: () => void;
};

export const RightAction = ({onNavigateToPopUpModal}: TRightActionProps) => {
  return (
    <View style={styles.rightActionStyle}>
      <PressableIcon
        iconName={'Cross'}
        onPress={onNavigateToPopUpModal}
        color={COLORS.desctructive500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightActionStyle: {
    right: -PADDING_HORIZONTAL,
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    borderLeftColor: 'transparent',
    justifyContent: 'center',
  },
});

import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Rectangle} from 'src/assets/svg';
import {RootStackScreenProps} from 'src/navigation/types';
import {ModalOverlay} from 'src/components/ModalOverlay';

export const BottomSheetModal = ({
  route,
}: RootStackScreenProps<'BottomSheetModal'>) => {
  const {children} = route.params;

  return (
    <ModalOverlay variant="bottom">
      <View style={styles.alignCenter}>
        <Rectangle style={styles.rectangle} />
        <Typography variant="16" textStyle={styles.text}>
          Select
        </Typography>
        <View style={styles.bottomLine} />
        {children}
      </View>
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  text: {
    color: COLORS.warning500,
    fontWeight: '100',
    marginTop: 27,
  },
  bottomLine: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
    paddingTop: 15,
    width: '100%',
  },
  rectangle: {
    marginTop: 10,
  },
});

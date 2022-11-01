import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Rectangle} from 'src/assets/svg';
import {RootStackScreenProps} from 'src/navigation/types';

export const BottomSheetModal = ({
  navigation,
  route,
}: RootStackScreenProps<'BottomSheetModal'>) => {
  const {children} = route.params;
  return (
    <TouchableOpacity style={[styles.flex, styles.background]}>
      <Pressable style={styles.flex} onPress={navigation.goBack}>
        <View onStartShouldSetResponder={_ => true} style={styles.modalView}>
          <View style={styles.alignCenter}>
            <Rectangle />
            <Typography variant="16" textStyle={styles.text}>
              Select
            </Typography>
            <View style={[styles.bottomLine]} />

            {children}
          </View>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: '85%',
    paddingTop: 10,
    width: '100%',
  },
  background: {
    backgroundColor: COLORS.neutral500opaque,
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
});

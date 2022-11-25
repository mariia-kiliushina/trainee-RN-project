import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {RootStackScreenProps} from 'src/navigation/types';

export const PopUpModal = ({
  navigation,
  route,
}: RootStackScreenProps<'PopUpModal'>) => {
  const {children} = route.params;

  return (
    <TouchableOpacity style={styles.background}>
      <Pressable style={styles.pressableWraper} onPress={navigation.goBack}>
        <View onStartShouldSetResponder={_ => true} style={styles.modalView}>
          {children}
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressableWraper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    minHeight: '20%',
    padding: 20,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: COLORS.neutral500opaque,
  },
});

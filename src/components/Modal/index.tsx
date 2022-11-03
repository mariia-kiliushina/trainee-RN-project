import {ReactNode} from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from 'constants/colors';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

export const ModalWindow = ({
  isModalOpen,
  setIsModalOpen,
  children,
  style,
}: Props) => {
  const onPress = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.modalBackground}>
        <KeyboardAwareScrollView contentContainerStyle={styles.centeredView}>
          <View
            onStartShouldSetResponder={_ => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}
            style={[styles.modalView, style]}
          >
            {children}
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: COLORS.neutral500opaque,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: COLORS.genericWhite,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
  },
});

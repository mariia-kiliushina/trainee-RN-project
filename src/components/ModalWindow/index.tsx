import React, {ReactNode} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  children: ReactNode;
};

export const ModalWindow = ({isModalOpen, setIsModalOpen, children}: Props) => {
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
      }}>
      <TouchableOpacity onPress={onPress} style={styles.modalBackground}>
        <KeyboardAwareScrollView contentContainerStyle={styles.centeredView}>
          <View
            onStartShouldSetResponder={_ => true}
            onTouchEnd={e => {
              e.stopPropagation();
            }}
            style={styles.modalView}>
            {children}
          </View>
        </KeyboardAwareScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  modalBackground: {
    backgroundColor: 'rgba(239, 239, 240, 0.7)',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
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

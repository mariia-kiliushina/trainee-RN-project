import React, {ReactNode} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  children: ReactNode;
};

export const ModalWindow = ({isModalOpen, setIsModalOpen, children}: Props) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.main}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(!isModalOpen);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
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

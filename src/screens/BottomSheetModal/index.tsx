import React, {ReactNode} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Container} from 'src/components/Container';
import {RootStackParamList} from 'src/navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<RootStackParamList> & {
  isModalOpen: boolean;
  children: ReactNode;
};

export const BottomSheetModal = ({navigation, children}: Props) => {
  return (
    <Container style={styles.main}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}
          style={styles.modalBackground}
        >
          <KeyboardAwareScrollView contentContainerStyle={styles.centeredView}>
            <View
              onStartShouldSetResponder={_ => true}
              onTouchEnd={e => {
                e.stopPropagation();
              }}
              style={styles.modalView}
            >
              {children}
            </View>
          </KeyboardAwareScrollView>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  modalBackground: {
    backgroundColor: 'rgba(239, 239, 240, 0.6)',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: COLORS.base000,
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

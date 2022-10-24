import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {RootStackParamList} from 'src/navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Typography} from 'src/components/Typography';
import {Rectangle} from 'src/assets/svg';
import {Input} from 'src/components/Input';
import {SelectItem} from 'src/components/SelectItem';

type Props = NativeStackScreenProps<RootStackParamList> & {};

export const BottomSheetModal = ({navigation}: Props) => {
  const {width} = useWindowDimensions();

  const ownAccountData = [
    {
      name: 'Account1',
      accountNumber: '301090',
    },
    {
      name: 'Account2',
      accountNumber: '3018998',
    },
    {
      name: 'Account3',
      accountNumber: '30187987',
    },
    {
      name: 'Account4',
      accountNumber: '301023490',
    },
    {
      name: 'Account5',
      accountNumber: '3018928911078',
    },
    {
      name: 'Account6',
      accountNumber: '301872341987',
    },
    {
      name: 'Account7',
      accountNumber: '301023467890',
    },
    {
      name: 'Account8',
      accountNumber: '30183249678798',
    },
    {
      name: 'Account9',
      accountNumber: '30187876787',
    },
  ];

  const ownAccountDataItems = ownAccountData.map(item => {
    return (
      <SelectItem
        key={item.accountNumber}
        fieldName="fromAccount"
        iconName="bank"
        name={item.name}
        accountNumber={item.accountNumber}
      />
    );
  });

  const [searchText, setSearchText] = useState('');
  const onChangeSearchText: (e: string) => void = (e: string) => {
    setSearchText(e);
  };
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main');
          }}
          style={styles.modalBackground}
        >
          <KeyboardAwareScrollView contentContainerStyle={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Rectangle />
                <Typography variant="16" textStyle={styles.text}>
                  Select
                </Typography>
              </View>
              <View style={[styles.bottomLine, {width}]} />
              <View style={styles.contentWrapper}>
                <View style={{height: 55}}>
                  <Input
                    value={searchText}
                    placeholder="Search account"
                    onChangeText={onChangeSearchText}
                  />
                </View>
                <ScrollView
                  style={styles.itemsWrapper}
                  onTouchEnd={e => {
                    e.stopPropagation();
                  }}
                >
                  {ownAccountDataItems}
                </ScrollView>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    height: '85%',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 0,
    width: '100%',
    backgroundColor: 'white',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalBackground: {
    backgroundColor: COLORS.neutral500opaque,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemsWrapper: {},
  contentWrapper: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: '100',
    color: COLORS.warning500,
    marginTop: 27,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
    alignItems: 'center',
    paddingTop: 15,
  },
});

import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {RootStackParamList} from 'src/navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    <TouchableOpacity style={[styles.flex, styles.background]}>
      <TouchableOpacity style={styles.flex}>
        <Pressable
          onPress={() => {
            navigation.navigate('Main');
          }}
          style={styles.flex}
        >
          <View onStartShouldSetResponder={_ => true} style={styles.modalView}>
            <KeyboardAvoidingView style={styles.flex}>
              <View style={styles.alignCenter}>
                <Rectangle />
                <Typography variant="16" textStyle={styles.text}>
                  Select
                </Typography>
              </View>
              <View style={[styles.bottomLine, {width}]} />
              <View style={[styles.flex, styles.contentWrapper]}>
                <View style={styles.inputRestrictionWrapper}>
                  <Input
                    value={searchText}
                    placeholder="Search account"
                    onChangeText={onChangeSearchText}
                  />
                </View>
                <ScrollView>{ownAccountDataItems}</ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Pressable>
      </TouchableOpacity>
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

  contentWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  inputRestrictionWrapper: {
    height: 55,
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
  },
});

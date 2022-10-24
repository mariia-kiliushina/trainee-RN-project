import React, {useState} from 'react';
import {Formik} from 'formik';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {Container} from 'src/components/Container';
import {InputClickable} from 'src/components/InputClickable';
import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {ModalWindow} from 'src/components/Modal';
import {Rectangle} from 'src/assets/svg';
import {SelectItem} from 'components/SelectItem';
import {Input} from 'src/components/Input';

export type InitialValues = {
  fromAccount: string;
  toAccount: string;
  amount: string;
};

const initialValues: InitialValues = {
  fromAccount: '',
  toAccount: '',
  amount: '',
};

export const Transaction = () => {
  const [isModalOwnAccountOpen, setIsModalOwnAccountOpen] = useState(false);
  const [isModalBeneficiaryOpen, setIsModalBeneficiaryOpen] = useState(false);

  const {width} = useWindowDimensions();

  const onPressOwnAccount = () => {
    setIsModalOwnAccountOpen(true);
  };

  const onPressBeneficiaryAccount = () => {
    setIsModalBeneficiaryOpen(true);
  };

  const beneficiaryAccountData = [
    {
      name: 'ADOGA JEFFERY',
      accountNumber: '0123456789',
    },
    {
      name: 'HENRY ISAAC',
      accountNumber: '9999999999',
    },
    {
      name: 'ADOGA JEFFERY',
      accountNumber: '0123456e789',
    },
    {
      name: 'HENRY ISAAC',
      accountNumber: '99999fsd99999',
    },
    {
      name: 'ADOGA JEFFERY',
      accountNumber: '0123wqe456789',
    },
    {
      name: 'HENRY ISAAC',
      accountNumber: '99999df99999',
    },
    {
      name: 'ADOGA JEFFERY',
      accountNumber: '012345236789',
    },
    {
      name: 'HENRY ISAAC',
      accountNumber: '99999wd99999',
    },
    {
      name: 'ADOGA JEFFERY',
      accountNumber: '012345sds6789',
    },
    {
      name: 'HENRY ISAAC',
      accountNumber: '999999sds9999',
    },
  ];

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

  const [searchText, setSearchText] = useState('');

  const onChangeSearchText: (e: string) => void = (e: string) => {
    setSearchText(e);
  };

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

  const beneficiaryAccountDataItems = beneficiaryAccountData.map(item => {
    return (
      <SelectItem
        key={item.accountNumber}
        fieldName="toAccount"
        iconName="user"
        name={item.name}
        accountNumber={item.accountNumber}
      />
    );
  });

  return (
    <Container style={styles.main}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => {
          console.log(values);
          Keyboard.dismiss();
        }}
      >
        {({handleChange, handleSubmit, values, errors, handleBlur}) => (
          <View>
            <InputClickable
              onPress={onPressOwnAccount}
              onChangeText={handleChange('fromAccount')}
              onBlur={handleBlur('fromAccount')}
              value={values.fromAccount}
              errorText={errors.fromAccount}
              placeholder="Select sender"
              placeholderTextColor={COLORS.neutral100}
              inputStyle={styles.inputStyle}
              selected
            >
              <Typography
                style={styles.transferDrection}
                color={COLORS.neutral100}
              >
                From
              </Typography>
              <Typography style={styles.account} color={COLORS.neutral100}>
                Account
              </Typography>
            </InputClickable>
            <InputClickable
              onPress={onPressBeneficiaryAccount}
              onChangeText={handleChange('toAccount')}
              onBlur={handleBlur('toAccount')}
              value={values.toAccount}
              errorText={errors.toAccount}
              placeholder="Select beneficiary"
              placeholderTextColor={COLORS.neutral400}
              inputStyle={styles.inputStyle}
              shadow={true}
            >
              <Typography
                style={styles.transferDrection}
                color={COLORS.neutral400}
              >
                To
              </Typography>
              <Typography style={styles.account} color={COLORS.neutral400}>
                Account
              </Typography>
            </InputClickable>

            <Button onPress={handleSubmit} title="Proceed" />

            <ModalWindow
              isModalOpen={isModalOwnAccountOpen}
              setIsModalOpen={setIsModalOwnAccountOpen}
              style={[{width}, styles.modalContentWrapper]}
            >
              <View style={styles.wrapper}>
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
            </ModalWindow>

            <ModalWindow
              isModalOpen={isModalBeneficiaryOpen}
              setIsModalOpen={setIsModalBeneficiaryOpen}
              style={[{width}, styles.modalContentWrapper]}
            >
              <View style={styles.wrapper}>
                <View style={{alignItems: 'center'}}>
                  <Rectangle />
                  <Typography variant="16" textStyle={styles.text}>
                    Select
                  </Typography>
                </View>
                <View style={[styles.bottomLine, {width}]} />
                <View style={styles.contentWrapper}>
                  <View style={{height: 45}}>
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
                    {beneficiaryAccountDataItems}
                  </ScrollView>
                </View>
              </View>
            </ModalWindow>
          </View>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  itemsWrapper: {},
  contentWrapper: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  wrapper: {
    flex: 1,
    width: '100%',
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
  modalContentWrapper: {
    height: '85%',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  inputStyle: {
    paddingTop: 22,
    paddingLeft: 90,
  },
  transferDrection: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  account: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
});

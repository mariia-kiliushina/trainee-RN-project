import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';
import {Button} from 'components/Button';

export const AddRecord = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      <Typography variant="18" fontType="bold" style={styles.textStyle}>
        Add record
      </Typography>

      <Button
        onPress={onNavigate}
        iconStyle={styles.iconStyle}
        style={styles.navigationButton}
        type="secondary">
        Go back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
  },

  navigationButton: {
    position: 'absolute',
    top: '85%',
    right: '5%',
    width: '60%',
  },
  iconStyle: {
    marginRight: 0,
  },
});

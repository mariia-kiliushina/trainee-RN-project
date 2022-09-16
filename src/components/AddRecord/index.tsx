import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from '../Typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/App';
import {Button} from 'components/Button';

export const AddRecord = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onNavigate = () => {
    navigation.navigate('Home');
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
    paddingTop: 60,
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

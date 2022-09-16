import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from 'components/Button';
import {RootStackParamList} from 'src/navigation/stack';

export const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);

  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  const firstGroupPressHanler = () =>
    setTimesPressedPrimary(current => current + 1);

  const secondGroupPressHandler = () =>
    setTimesPressedSecondary(current => current + 1);

  const linkPressHandler = () => setTimesPressedLink(current => current + 1);

  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <Typography variant="18" fontType="bold">
          {timesPressedPrimary}
        </Typography>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={firstGroupPressHanler}
            iconName="plusSquared"
            type="primary"
            style={styles.buttonLeft}>
            Press me
          </Button>
          <Button
            onPress={firstGroupPressHanler}
            type="primary"
            style={styles.buttonRight}>
            Press me
          </Button>
        </View>
        <Typography variant="18" fontType="bold">
          {timesPressedSecondary}
        </Typography>
        <Button onPress={secondGroupPressHandler} iconName="pen" type="primary">
          Press me
        </Button>
        <Button onPress={secondGroupPressHandler} type="primary">
          Press me
        </Button>
        <Button
          onPress={secondGroupPressHandler}
          iconName="pen"
          type="secondary">
          Press me
        </Button>
        <Button onPress={secondGroupPressHandler} type="secondary">
          Press me
        </Button>
        <Typography variant="18" fontType="bold">
          {timesPressedLink}
        </Typography>

        <Button onPress={linkPressHandler} type="link">
          Press
        </Button>
      </View>
      <Button
        onPress={onNavigate}
        iconStyle={styles.iconStyle}
        style={styles.navigationButton}
        type="secondary">
        Go to another screen
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
  mainContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLeft: {
    flex: 1,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 16,
  },
  navigationButton: {
    position: 'absolute',
    top: '95%',
    right: '5%',
    width: '60%',
  },
  iconStyle: {
    marginRight: 0,
  },
});

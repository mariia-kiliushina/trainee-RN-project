import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Button} from 'components/Button';
import {Typography} from 'components/Typography';
import {TopNavigation} from 'components/TopNavigation';

export const Home = () => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);

  const firstGroupPressHanler = () =>
    setTimesPressedPrimary(current => current + 1);

  const secondGroupPressHandler = () =>
    setTimesPressedSecondary(current => current + 1);

  const linkPressHandler = () => setTimesPressedLink(current => current + 1);

  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <TopNavigation path="AddRecord" iconName="add">
          Home page
        </TopNavigation>
        <Typography variant="18" fontType="bold">
          {timesPressedPrimary}
        </Typography>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={firstGroupPressHanler}
            iconName="add"
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
        <Button
          onPress={secondGroupPressHandler}
          iconName="cross"
          type="primary">
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
    flex: 1,
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
});

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Button} from '../Button';
import {Typography} from '../Typography';

export const Home = () => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);

  const primaryPressHanler = () =>
    setTimesPressedPrimary(current => current + 1);

  const secondaryPressHandler = () =>
    setTimesPressedSecondary(current => current + 1);

  const linkPressHandler = () => setTimesPressedLink(current => current + 1);

  return (
    <View style={styles.main}>
      <Typography variant="18" fontType="bold">
        {timesPressedPrimary}
      </Typography>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={primaryPressHanler}
          iconName="add"
          type="primary"
          style={styles.buttonLeft}>
          Press me
        </Button>
        <Button
          onPress={primaryPressHanler}
          type="primary"
          style={styles.buttonRight}>
          Press me
        </Button>
      </View>
      <Typography variant="18" fontType="bold">
        {timesPressedSecondary}
      </Typography>
      <Button onPress={secondaryPressHandler} iconName="cross" type="primary">
        Press me
      </Button>
      <Button onPress={secondaryPressHandler} type="primary">
        Press me
      </Button>
      <Button onPress={secondaryPressHandler} iconName="pen" type="secondary">
        Press me
      </Button>
      <Button onPress={secondaryPressHandler} type="secondary">
        Press me
      </Button>
      <Typography variant="18" fontType="bold">
        {timesPressedLink}
      </Typography>

      <Button onPress={linkPressHandler} type="link">
        Press
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

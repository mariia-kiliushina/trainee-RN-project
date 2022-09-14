import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import Typography from '../Typography';

const Home = () => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);

  return (
    <View style={styles.main}>
      <Typography variant="18" fontType="bold">
        {timesPressedPrimary}
      </Typography>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => setTimesPressedPrimary(current => current + 1)}
          svg="cross"
          type="primary"
          style={styles.buttonLeft}>
          Press me
        </Button>
        <Button
          onPress={() => setTimesPressedPrimary(current => current + 1)}
          type="primary"
          style={styles.buttonRight}>
          Press me
        </Button>
      </View>
      <Typography variant="18" fontType="bold">
        {timesPressedSecondary}
      </Typography>
      <Button
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        svg="cross"
        type="primary">
        Press me
      </Button>
      <Button
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        type="primary">
        Press me
      </Button>
      <Button
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        svg="cross"
        type="secondary">
        Press me
      </Button>
      <Button
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        type="secondary">
        Press me
      </Button>
      <Typography variant="18" fontType="bold">
        {timesPressedLink}
      </Typography>

      <Button
        onPress={() => setTimesPressedLink(current => current + 1)}
        type="link">
        Press
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
export default Home;

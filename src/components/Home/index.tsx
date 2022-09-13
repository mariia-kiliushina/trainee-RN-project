import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import Typography from '../Typography';
import COLORS from '../../COLORS';

const Home = () => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);
  return (
    <View style={styles.main}>
      <Typography color={COLORS.baseDark50} fontType="bold">
        {timesPressedPrimary}
      </Typography>
      <View style={styles.flexContainer}>
        <Button
          size="large"
          onPress={() => setTimesPressedPrimary(current => current + 1)}
          svg="cross"
          type="primary">
          Press me
        </Button>
        <Button
          size="large"
          onPress={() => setTimesPressedPrimary(current => current + 1)}
          type="primary">
          Press me
        </Button>
      </View>
      <Typography color={COLORS.baseDark50} fontType="regular">
        {timesPressedSecondary}
      </Typography>
      <Button
        size="small"
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        svg="cross"
        type="primary">
        Press me
      </Button>
      <Button
        size="small"
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        type="primary">
        Press me
      </Button>
      <Button
        size="small"
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        svg="cross"
        type="secondary">
        Press me
      </Button>
      <Button
        size="small"
        onPress={() => setTimesPressedSecondary(current => current + 1)}
        type="secondary">
        Press me
      </Button>
      <Typography color={COLORS.baseDark50} fontType="bold">
        {timesPressedLink}
      </Typography>

      <Button
        size="pills"
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  flexContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});
export default Home;

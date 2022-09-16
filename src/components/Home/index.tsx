import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/App';
import {Button} from 'components/Button';

export const Home = () => {
  const [timesPressedPrimary, setTimesPressedPrimary] = useState(0);
  const [timesPressedSecondary, setTimesPressedSecondary] = useState(0);
  const [timesPressedLink, setTimesPressedLink] = useState(0);

  const firstGroupPressHanler = () =>
    setTimesPressedPrimary(current => current + 1);

  const secondGroupPressHandler = () =>
    setTimesPressedSecondary(current => current + 1);

  const linkPressHandler = () => setTimesPressedLink(current => current + 1);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onNavigate = (path: string) => {
    let pathObj = {
      name: path,
      key: '',
    };
    navigation.navigate(pathObj);
  };

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
        <Button
          onPress={secondGroupPressHandler}
          iconName="arrow"
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
      <Button
        onPress={() => onNavigate('AddRecord')}
        iconStyle={{marginRight: 0}}
        style={{
          position: 'relative',
          top: -16,
          left: 0,
        }}
        type="link">
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
});

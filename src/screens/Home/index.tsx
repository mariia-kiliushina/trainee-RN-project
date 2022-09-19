import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from 'components/Typography';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from 'components/Button';
import {RootStackParamList} from 'src/navigation/stack';
import {Layout} from 'components/Layout';
import {COLORS} from 'constants/colors';

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
      <Layout>
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
        <Button
          onPress={onNavigate}
          iconStyle={styles.iconStyle}
          style={styles.navigationButton}
          type="secondary">
          Go to another screen
        </Button>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
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
    marginTop: 'auto',
    width: '50%',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    marginRight: 0,
  },
});

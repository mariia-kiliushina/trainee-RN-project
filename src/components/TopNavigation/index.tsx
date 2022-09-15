import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'components/Button';
import {RootStackParamList} from 'src/App';

type TopNavigationType = 'full' | 'half' | 'titleOnly';

type Props = {
  type: TopNavigationType;
  toPath: keyof RootStackParamList;
  children: ReactNode;
};

export const TopNavigation = ({type, toPath, children}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  let pathObj = {
    name: toPath,
    key: '',
  };
  const onNavigate = () => {
    navigation.navigate(pathObj);
  };
  return (
    <View style={styles.main}>
      {type !== 'titleOnly' && (
        <Button
          onPress={onNavigate}
          iconStyle={{marginRight: 0}}
          style={{
            position: 'absolute',
            top: 16,
            left: 10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconName="arrow"
          type="link"
        />
      )}
      <Typography variant="18" fontType="bold">
        {children}
      </Typography>
      {type === 'full' && (
        <Button
          onPress={() => {}}
          iconStyle={{marginRight: 0}}
          style={{
            position: 'absolute',
            top: 16,
            right: 10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconName="dots"
          type="link"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '10%',
    width: '100%',
    backgroundColor: COLORS.baseLight80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

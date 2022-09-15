import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'components/Typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'components/Button';
import {RootStackParamList} from 'src/App';
import {IconTypes} from 'components/Button';

type Props = {
  path: string;
  iconName: IconTypes;
  children: ReactNode;
};

export const TopNavigation = ({path, iconName, children}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onNavigate = () => {
    //@ts-ignore
    navigation.navigate(path);
  };
  return (
    <View style={styles.main}>
      {iconName && (
        <Button
          onPress={onNavigate}
          iconStyle={{marginRight: 0}}
          style={{
            position: 'absolute',
            top: 18,
            left: 10,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.violet20,
          }}
          iconName={iconName}
          type="link"
        />
      )}
      <Typography variant="18" fontType="bold">
        {children}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '10%',
    width: '100%',
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

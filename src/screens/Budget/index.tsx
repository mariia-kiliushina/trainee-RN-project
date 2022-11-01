import {Container} from 'src/components/Container';

import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {Pressable, StyleSheet} from 'react-native';
import {HomeTabScreenProps} from 'src/navigation/types';

export const Budget = ({navigation}: HomeTabScreenProps<'Budget'>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };
  return (
    <Container style={styles.main}>
      <Typography>Budget</Typography>

      <Pressable onPress={onNavigate} style={styles.button}>
        <Typography variant="18" fontType="regular" color={COLORS.base000}>
          Go to another screen
        </Typography>
      </Pressable>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.base000,
  },
  button: {
    marginTop: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 'auto',
    height: 44,
    width: '70%',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.warning500,
    borderRadius: 6,
    alignItems: 'center',
  },
});

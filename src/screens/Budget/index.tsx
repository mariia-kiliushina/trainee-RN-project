import {View, StyleSheet} from 'react-native';
import {HomeTabScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Button} from 'components/Button';
import {TabView} from 'components/TabView';
import {COLORS} from 'src/constants/colors';
import {tabs} from './mock';

export const Budget = ({navigation}: HomeTabScreenProps<'Budget'>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };

  return (
    <Container style={styles.style} contentLayout={styles.contentLayout}>
      <TabView tabs={tabs} />
      <View style={styles.wrapper}>
        <Button onPress={onNavigate} type="primary">
          Go to another screen
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.neutral100,
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
});

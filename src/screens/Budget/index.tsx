import {View, StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {TabView} from 'components/TabView';
import {COLORS} from 'src/constants/colors';
import {tabs} from './mock';

export const Budget = () => {
  return (
    <Container
      style={styles.style}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <TabView tabs={tabs} />
      <View style={styles.wrapper} />
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.neutral100,
  },
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
});

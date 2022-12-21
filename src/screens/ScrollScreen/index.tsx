import {
  Platform,
  StyleSheet,
  UIManager,
  useWindowDimensions,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {PostsReanimated} from 'src/components/PostsReanimated';
import {COLORS} from 'constants/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ScrollScreen = () => {
  const {width} = useWindowDimensions();
  return (
    <Container contentLayout={styles.contentLayout}>
      <ScrollView nestedScrollEnabled={true} style={styles.outerScroll}>
        <View style={styles.contentWrapper}>
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <Typography variant="18" fontType="bold" textStyle={styles.text}>
            Transaction history
          </Typography>
        </View>
        <ScrollView
          horizontal
          scrollEnabled={false}
          nestedScrollEnabled={true}
          contentContainerStyle={{width}}
          style={styles.innerScroll}
        >
          <PostsReanimated />
        </ScrollView>
        <View style={styles.contentWrapper}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
  outerScroll: {
    backgroundColor: COLORS.genericWhite,
  },
  innerScroll: {
    height: 300,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    height: 110,
    marginBottom: 15,
    padding: 10,
  },
  text: {
    color: COLORS.neutral500,
  },
});

import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {HomeTabScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';
import {infoList, TInfoItem} from './mock';
import {CrossClose} from 'src/assets/svg';

const circleSize = 30;

const leftStyle = {
  left: -circleSize / 2,
};

const rightStyle = {
  right: -circleSize / 2,
};

const backgroundColor = COLORS.neutral100;

export const Bills = ({}: HomeTabScreenProps<'Bills'>) => {
  return (
    <Container
      viewType="fixed"
      style={styles.style}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.resultView}>
        <CrossClose width={50} height={50} />
        <Typography
          style={styles.resultViewTextStyle}
          variant="16"
          fontType="bold"
          color={COLORS.genericWhite}
        >
          Transaction unsuccessful
        </Typography>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topCard}>
            <Typography color={COLORS.neutral400}>Amount</Typography>
            <Typography variant="24" fontType="bold" color={COLORS.neutral900}>
              $10.00
            </Typography>

            <View style={[styles.circle, leftStyle]} />
            <View style={[styles.circle, rightStyle]} />
          </View>
          <View style={styles.bottomCard}>
            {infoList.map((infoItem: TInfoItem) => (
              <View key={infoItem.title} style={styles.bottomCardItem}>
                <Typography color={COLORS.neutral400}>
                  {infoItem.title}
                </Typography>
                <Typography color={COLORS.neutral900}>
                  {infoItem.text}
                </Typography>
              </View>
            ))}
            <Button type="primary" style={styles.topButton}>
              Try again
            </Button>
            <Button type="secondary" style={styles.bottomButton}>
              Close
            </Button>
          </View>
          <View style={styles.topCard}>
            <View style={[styles.circle, leftStyle]} />
            <View style={[styles.circle, rightStyle]} />

            <Typography color={COLORS.neutral400}>Amount</Typography>
            <Typography variant="24" fontType="bold" color={COLORS.neutral900}>
              $10.00
            </Typography>
          </View>
          <View style={styles.bottomCard}>
            {infoList.map((infoItem: TInfoItem) => (
              <View key={infoItem.title} style={styles.bottomCardItem}>
                <Typography color={COLORS.neutral400}>
                  {infoItem.title}
                </Typography>
                <Typography color={COLORS.neutral900}>
                  {infoItem.text}
                </Typography>
              </View>
            ))}
            <Button type="primary" style={styles.topButton}>
              Try again
            </Button>
            <Button type="secondary" style={styles.bottomButton}>
              Close
            </Button>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.omniDark,
  },
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
  resultView: {
    flex: 1,
    backgroundColor: COLORS.omniDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultViewTextStyle: {
    marginTop: 15,
  },
  scrollWrapper: {
    flex: 4,
    backgroundColor: backgroundColor,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  topCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 2,
    padding: 20,
  },
  bottomCard: {
    zIndex: -1,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 20,
    padding: 20,
    paddingTop: 35,
  },
  bottomCardItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: backgroundColor,
    padding: 20,
  },
  circle: {
    position: 'absolute',
    backgroundColor: backgroundColor,
    aspectRatio: 1,
    height: circleSize,
    borderRadius: circleSize / 2,
    bottom: -circleSize / 2,
  },
  topButton: {
    marginTop: 70,
  },
  bottomButton: {
    marginBottom: 0,
  },
});

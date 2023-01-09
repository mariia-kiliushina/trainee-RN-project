import {StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {TInfoItem} from 'src/screens/Bills/mock';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {useNavigation} from '@react-navigation/native';

const circleSize = 30;

const leftStyle = {
  left: -circleSize / 2,
};

const rightStyle = {
  right: -circleSize / 2,
};

const backgroundColor = COLORS.neutral100;

type Props = {
  infoList: TInfoItem[];
  amount: string;
};

export const Bill = ({infoList, amount}: Props) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.topCard}>
        <Typography color={COLORS.neutral400}>Amount</Typography>
        <Typography variant="24" fontType="bold" color={COLORS.neutral900}>
          {amount}
        </Typography>
      </View>
      <View style={styles.bottomCard}>
        <View style={[styles.circle, leftStyle]} />
        <View style={[styles.circle, rightStyle]} />
        {infoList.map(infoItem => (
          <View key={infoItem.title} style={styles.bottomCardItem}>
            <Typography color={COLORS.neutral400}>{infoItem.title}</Typography>
            <Typography color={COLORS.neutral900}>{infoItem.text}</Typography>
          </View>
        ))}
        <Button
          type="primary"
          style={styles.topButton}
          onPress={navigation.goBack}
        >
          Try again
        </Button>
        <Button
          type="secondary"
          style={styles.bottomButton}
          onPress={navigation.goBack}
        >
          Close
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 2,
    padding: 20,
  },
  bottomCard: {
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
    top: -circleSize / 2,
  },
  topButton: {
    marginTop: 70,
  },
  bottomButton: {
    marginBottom: 0,
  },
});

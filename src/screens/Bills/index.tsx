import {ScrollView, StyleSheet, View} from 'react-native';
import {Container} from 'src/components/Container';
import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {CrossClose} from 'src/assets/svg';
import {Bill} from 'src/components/Bill';
import {infoList} from './mock';

const backgroundColor = COLORS.neutral100;
const transactionAmountString = '$10.00';

export const Bills = () => {
  return (
    <Container
      viewType="fixed"
      style={styles.style}
      contentContainerStyle={styles.contentContainerStyle}
    >
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
      <ScrollView
        style={styles.scrollWrapper}
        contentContainerStyle={styles.scrollContainer}
      >
        <Bill infoList={infoList} amount={transactionAmountString} />
        <Bill infoList={infoList} amount={transactionAmountString} />
      </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 15,
  },
  resultViewTextStyle: {
    marginTop: 15,
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
});

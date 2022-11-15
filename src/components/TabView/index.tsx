import {StyleSheet, ScrollView, Pressable} from 'react-native';

import {Typography} from 'src/components/Typography';
import {tabs} from 'components/TabView/mock';

import {COLORS} from 'src/constants/colors';

type Props = {
  selectedTab: string;
  onPress: (item: string, index: number) => void;
};

export const TabView = ({selectedTab, onPress}: Props) => {
  return (
    <ScrollView
      horizontal={true}
      style={styles.sliderStyle}
      showsHorizontalScrollIndicator={true}
      scrollEnabled={true}
    >
      {tabs.map((item, index) => {
        return (
          <Pressable
            key={item}
            style={styles.tabWrapper}
            onPress={() => onPress(item, index)}
          >
            <Typography
              fontType={selectedTab === item ? 'bold' : 'regular'}
              textStyle={styles.text}
            >
              {item}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderStyle: {
    backgroundColor: COLORS.genericWhite,
    borderRadius: 10,
  },
  tabWrapper: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  text: {
    color: COLORS.neutral900,
  },
});

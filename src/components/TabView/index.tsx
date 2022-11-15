import {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {Input} from 'components/Input';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {TTab} from './types';

type Props = {
  tabs: TTab[];
};

export const TabView = ({tabs}: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {width} = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);

  const selectAndScrollToItem = (index: number) => {
    setSelectedTab(index);

    if (scrollRef) {
      scrollRef?.current?.scrollTo({
        x: width * index,
        animated: true,
      });
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let tabIndex = event.nativeEvent.contentOffset.x / width;
    setSelectedTab(tabIndex);
  };

  return (
    <View style={styles.tabsWrapper}>
      <View>
        <ScrollView
          horizontal={true}
          style={styles.sliderStyle}
          contentContainerStyle={styles.sliderContainer}
          showsHorizontalScrollIndicator={true}
          scrollEnabled={true}
        >
          {tabs.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                style={styles.tabWrapper}
                onPress={() => selectAndScrollToItem(index)}
              >
                <Typography
                  fontType={selectedTab === index ? 'bold' : 'regular'}
                  textStyle={styles.text}
                >
                  {item.name}
                </Typography>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        // onScroll={onScroll}
        pagingEnabled={true}
        horizontal
        ref={scrollRef}
      >
        {tabs.map((item, index) => {
          return (
            <View style={[styles.tabContainer, {width}]}>
              <Input
                key={index}
                value={item.name}
                onPress={() => {}}
                isPressable
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderStyle: {
    backgroundColor: COLORS.genericWhite,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  sliderContainer: {
    flexGrow: 1,
  },
  tabWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
  },
  text: {
    color: COLORS.neutral900,
  },
  tabsWrapper: {
    paddingBottom: 10,
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

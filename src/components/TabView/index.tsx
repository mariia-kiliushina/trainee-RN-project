import {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutRectangle,
  Animated,
} from 'react-native';
import {Typography} from 'src/components/Typography';
import {Input} from 'src/components/Input';
import {COLORS} from 'src/constants/colors';
import {TTab} from './types';

type Props = {
  tabs: TTab[];
};
type TTabPosition = {
  offsetX: number;
  tabWidth: number;
};

type TTabsPositionState = Record<string, TTabPosition>;

export const TabView = ({tabs}: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [tabsCoordinates, setTabsCoordinates] = useState<TTabsPositionState>(
    () => {
      return {
        '0': {offsetX: 0, tabWidth: 0},
        '1': {offsetX: 0, tabWidth: 0},
        '2': {offsetX: 0, tabWidth: 0},
        '3': {offsetX: 0, tabWidth: 0},
        '4': {offsetX: 0, tabWidth: 0},
      };
    },
  );

  const indicatorOffset = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const {width: screenWidth} = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);

  const selectAndScrollToItem = (index: number) => {
    if (scrollRef) {
      scrollRef?.current?.scrollTo({
        x: screenWidth * index,
        animated: true,
      });
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let tabIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth); //there could be small diff in pixels, so index happens to be of a float type
    setSelectedTabIndex(tabIndex);
    Animated.parallel([
      Animated.timing(indicatorOffset, {
        toValue: tabsCoordinates[selectedTabIndex].offsetX,
        useNativeDriver: false,
        duration: 600,
      }),
      Animated.timing(indicatorWidth, {
        toValue: tabsCoordinates[selectedTabIndex].tabWidth,
        useNativeDriver: false,
        duration: 600,
      }),
    ]).start();
  };

  const handleOnLayout = (
    {
      nativeEvent: {
        layout: {x: offsetX, width: tabWidth},
      },
    }: NativeSyntheticEvent<{
      layout: LayoutRectangle;
    }>,
    index: number,
  ) => {
    setTabsCoordinates(prevState => {
      return {
        ...prevState,
        [index]: {
          offsetX,
          tabWidth,
        },
      };
    });
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          horizontal
          contentContainerStyle={styles.tabsContainerStyle}
          style={styles.tabsStyle}
        >
          {tabs.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                onLayout={event => {
                  handleOnLayout(event, index);
                }}
                onPress={() => selectAndScrollToItem(index)}
                style={styles.tab}
              >
                <Typography
                  fontType={selectedTabIndex === index ? 'bold' : 'regular'}
                  textStyle={styles.text}
                >
                  {item.name}
                </Typography>
              </Pressable>
            );
          })}
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{translateX: indicatorOffset}],
                width: indicatorWidth,
              },
            ]}
          />
        </ScrollView>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onScroll={onScroll}
        scrollEventThrottle={1}
        pagingEnabled={true}
        horizontal
        ref={scrollRef}
      >
        {tabs.map((item, index) => {
          return (
            <View key={index} style={[styles.content, {width: screenWidth}]}>
              <Input value={item.name} onPress={() => {}} isPressable />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
    flex: 1,
  },
  tabsStyle: {
    backgroundColor: COLORS.genericWhite,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tabsContainerStyle: {
    flexGrow: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  text: {
    color: COLORS.neutral900,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 2,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.omniPrimaryColor,
  },
});

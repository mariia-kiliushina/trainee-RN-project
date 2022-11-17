import {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  LayoutChangeEvent,
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
      const obj: {[key: string]: TTabPosition} = {};

      for (let index = 0; index < tabs.length; index++) {
        obj[index] = {tabWidth: 0, offsetX: 0};
      }

      return obj;
    },
  );

  const {width: screenWidth} = useWindowDimensions();

  const indicatorOffset = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef<ScrollView>(null);

  const selectAndScrollToItem = (index: number) => {
    if (scrollRef) {
      scrollRef?.current?.scrollTo({
        x: screenWidth * index,
        animated: true,
      });
    }

    Animated.parallel([
      Animated.timing(indicatorOffset, {
        toValue: tabsCoordinates[index].offsetX,
        useNativeDriver: false,
        duration: 400,
      }),

      Animated.timing(indicatorWidth, {
        toValue: tabsCoordinates[index].tabWidth,
        useNativeDriver: false,
        duration: 400,
      }),
    ]).start(({finished}) => {
      finished && setSelectedTabIndex(index);
    });
  };

  const handleOnLayout = (
    {
      nativeEvent: {
        layout: {x: offsetX, width: tabWidth},
      },
    }: LayoutChangeEvent,
    index: number,
  ) => {
    if (index === 0) {
      indicatorWidth.setValue(tabWidth);
    }

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
          contentContainerStyle={styles.tabsContentContainer}
          style={styles.tabsContainer}
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
                  textStyle={selectedTabIndex === index && styles.selectedText}
                >
                  {item.name}
                </Typography>
              </Pressable>
            );
          })}
          <Animated.View
            style={[
              styles.indicatorContainer,
              {
                transform: [{translateX: indicatorOffset}],
                width: indicatorWidth,
              },
            ]}
          >
            <View style={styles.indicator} />
          </Animated.View>
        </ScrollView>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
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
  tabsContainer: {
    backgroundColor: COLORS.genericWhite,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tabsContentContainer: {
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
  selectedText: {
    color: COLORS.omniPrimaryColor,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 3,
  },
  indicator: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.omniPrimaryColor,
  },
});

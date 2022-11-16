import {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
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
      const obj: {[key: string]: TTabPosition} = {};

      for (let index = 0; index < tabs.length; index++) {
        obj[index] = {tabWidth: 0, offsetX: 0};
      }

      return obj;
    },
  );

  const indicatorOffset = useRef(new Animated.Value(0)).current;

  const {width: screenWidth} = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);

  const selectAndScrollToItem = (index: number) => {
    if (scrollRef) {
      scrollRef?.current?.scrollTo({
        x: screenWidth * index,
        animated: true,
      });
    }
    Animated.timing(indicatorOffset, {
      toValue: tabsCoordinates[index].offsetX,
      useNativeDriver: false,
      duration: 400,
    }).start();

    setSelectedTabIndex(index);
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
                width: tabsCoordinates[selectedTabIndex].tabWidth,
              },
            ]}
          />
        </ScrollView>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
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

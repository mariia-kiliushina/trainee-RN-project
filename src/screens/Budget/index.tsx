import {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {HomeTabScreenProps} from 'src/navigation/types';

import {Container} from 'src/components/Container';
import {Button} from 'components/Button';
import {Input} from 'components/Input';
import {TabView} from 'components/TabView';

import {COLORS} from 'src/constants/colors';
import {carouselData} from 'screens/Budget/mock';
import {tabs} from 'components/TabView/mock';

export const Budget = ({navigation}: HomeTabScreenProps<'Budget'>) => {
  const [selectedTab, setSelectedTab] = useState('');

  const {width} = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);

  const selectAndScrollToItem = (item: string, index: number) => {
    if (scrollRef) {
      scrollRef?.current?.scrollTo({
        x: width * index,
        animated: true,
      });
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let tabIndex = event.nativeEvent.contentOffset.x / width;
    setSelectedTab(tabs[tabIndex]);
  };

  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };

  return (
    <Container style={styles.style} contentLayout={styles.contentLayout}>
      <View style={styles.tabsWrapper}>
        <TabView selectedTab={selectedTab} onPress={selectAndScrollToItem} />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onScroll={onScroll}
        pagingEnabled={true}
        horizontal
        ref={scrollRef}
      >
        {carouselData.map((item, index) => {
          return (
            <View style={[{width: width}, styles.carouselView]}>
              <Input key={index} value={item} onPress={() => {}} isPressable />
            </View>
          );
        })}
      </ScrollView>

      <Button onPress={onNavigate} type="primary">
        Go to another screen
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.neutral100,
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  tabsWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  carouselView: {
    paddingHorizontal: 20,
  },
});

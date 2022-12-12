import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Platform, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Button} from 'src/components/Button';
import {usePosts} from 'src/hooks/usePosts';
import {TPost} from 'src/store/postsSlice/types';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {CrossClose} from 'src/assets/svg';

type PropsModal = {
  rowData: any;
  listData: TPost[];
  setListData: (listData: TPost[]) => void;
};

const NEGATVE_RIGHT_OFFSET = -10;
const PADDING_HORIZONTAL = 20 + NEGATVE_RIGHT_OFFSET;

export const PostsReanimated = ({
  navigation,
}: RootStackScreenProps<'PostsReanimated'>) => {
  const postsData = usePosts();

  const [listData, setListData] = useState<TPost[]>([]);

  useEffect(() => {
    let newList = postsData.map(({id, userId, title, body}) => ({
      id,
      userId,
      title: title.slice(0, 10),
      body: body.slice(0, 20),
    }));
    setListData(newList);
  }, [postsData]);

  const renderRightActions = () => (
    <View
      style={[
        {
          // borderWidth: 1,
          borderColor: 'violet',
          right: NEGATVE_RIGHT_OFFSET,
        },
        {backgroundColor: 'white', marginBottom: 20},
      ]}
    >
      <View>
        <Button style={styles.closeButton}>
          <CrossClose height={24} width={24} />
        </Button>
      </View>
    </View>
  );

  return (
    <Container
      hasKeyboardAwareScrollView={false}
      contentLayout={{paddingHorizontal: 40}}
    >
      {listData.map((item: TPost) => {
        return (
          <View key={item.id} style={styles.wrapper}>
            <Swipeable
              renderRightActions={renderRightActions}
              containerStyle={[styles.containerStyle, styles.shadow]}
              childrenContainerStyle={[styles.childrenContainerStyle]}
              overshootFriction={8}
            >
              <Pressable style={[styles.rowVisible, styles.shadow]}>
                <View style={{backgroundColor: 'white'}}>
                  <Typography variant="18" fontType="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="16">{item.body}</Typography>
                </View>
              </Pressable>
            </Swipeable>
          </View>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // borderWidth: 1,
    borderColor: 'brown',
    paddingLeft: PADDING_HORIZONTAL - NEGATVE_RIGHT_OFFSET,
    marginBottom: 20,
    marginRight: 10,
  },
  childrenContainerStyle: {
    justifyContent: 'center',
    // borderWidth: 1,
    paddingRight: -NEGATVE_RIGHT_OFFSET,
    borderColor: 'red',
  },
  rowVisible: {
    // borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  closeButton: {
    width: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  wrapper: {
    paddingRight: PADDING_HORIZONTAL,
    width: '100%',
    justifyContent: 'center',
  },

  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderRadius: 6,
      },
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
});

import {useEffect, useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {usePosts} from 'src/hooks/usePosts';
import {TPost} from 'src/store/postsSlice/types';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {Button} from 'src/components/Button';
import {useNavigation} from '@react-navigation/native';

type TPostKey = TPost & {key: number};

const deleteRow = (
  rowKey: any,
  rowMap: any,
  listData: TPostKey[],
  setListData: (listData: TPostKey[]) => void,
) => {
  const newList = listData.slice();
  const indexToDelete = listData.findIndex(
    (item: TPostKey) => item.key === rowKey,
  );
  newList.splice(indexToDelete, 1);
  setListData(newList);
};

const closeRow = (rowKey: any, rowMap: any) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

type PropsModal = {
  rowData: any;
  listData: TPostKey[];
  setListData: (listData: TPostKey[]) => void;
};
const ModalContent = ({rowData, listData, setListData}: PropsModal) => {
  const navigation = useNavigation();
  const {rowKey, rowMap} = rowData;

  const onGoBackWithoutDeletion = () => {
    closeRow(rowKey, rowMap);
    navigation.goBack();
  };

  const onDelete = () => {
    closeRow(rowKey, rowMap);
    deleteRow(rowKey, rowMap, listData, setListData);
    navigation.goBack();
  };
  return (
    <>
      <Typography textStyle={styles.text}>
        Are you sure you want to delete this row?
      </Typography>
      <Button type="secondary" onPress={onGoBackWithoutDeletion}>
        <Typography>No</Typography>
      </Button>
      <Button type="primary" onPress={onDelete}>
        <Typography>Yes</Typography>
      </Button>
    </>
  );
};

export const Posts = ({navigation}: RootStackScreenProps<'Posts'>) => {
  const postsData = usePosts();

  const [listData, setListData] = useState<TPostKey[]>([]);

  useEffect(() => {
    let newList = postsData.map(({id, userId, title, body}) => ({
      id,
      userId,
      title,
      body,
      key: id,
    }));
    setListData(newList);
  }, [postsData]);

  const onDelete = (rowData: any) => {
    navigation.navigate('PopUpModal', {
      children: (
        <ModalContent
          rowData={rowData}
          listData={listData}
          setListData={setListData}
        />
      ),
    });
  };

  const renderItem = (data: {item: TPost}) => (
    <Pressable style={styles.rowVisible}>
      <Typography variant="18" fontType="bold">
        {data.item.title}
      </Typography>
      <Typography variant="16">{data.item.body}</Typography>
    </Pressable>
  );

  const renderHiddenItem = (data: {item: TPost}, rowMap: any) => (
    <View style={styles.rowHidden}>
      <Pressable
        onPress={() => onDelete({rowMap, rowKey: data.item.key})}
        style={({pressed}) => [styles.backRightBtn, pressed && styles.pressed]}
      >
        <Typography variant="16" color={COLORS.genericWhite}>
          Delete
        </Typography>
      </Pressable>
    </View>
  );

  return (
    <Container hasKeyboardAwareScrollView={false}>
      <SwipeListView
        style={styles.container}
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        rightActivationValue={-300}
        closeOnRowOpen={true}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  rowVisible: {
    borderRadius: 6,
    backgroundColor: COLORS.omniPrimaryColor,
    marginBottom: 20,
    padding: 10,
  },
  rowHidden: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  backRightBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    borderRadius: 6,
    backgroundColor: COLORS.warningUltimate,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

// import {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// import {SwipeListView} from 'react-native-swipe-list-view';

// export function Posts() {
//   const [listData, setListData] = useState(
//     Array(20)
//       .fill('')
//       .map((_, i) => ({key: `${i}`, text: `item #${i}`})),
//   );

//   const closeRow = (rowMap, rowKey) => {
//     console.log('rowMap');
//     console.log(rowMap);
//     console.log('rowKey');
//     console.log(rowKey);
//     console.log('rowMap[rowKey]');
//     console.log(rowMap[rowKey]);

//     if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//     }
//   };

//   const deleteRow = (rowMap, rowKey) => {
//     closeRow(rowMap, rowKey);
//     const newData = [...listData];
//     const prevIndex = listData.findIndex(item => item.key === rowKey);
//     newData.splice(prevIndex, 1);
//     setListData(newData);
//   };

//   const onRowDidOpen = rowKey => {
//     console.log('This row opened', rowKey);
//   };

//   const renderItem = data => (
//     <TouchableHighlight
//       onPress={() => console.log('You touched me')}
//       style={styles.rowFront}
//       underlayColor={'#AAA'}
//     >
//       <View>
//         <Text>I am {data.item.text} in a SwipeListView</Text>
//       </View>
//     </TouchableHighlight>
//   );

//   const renderHiddenItem = (data, rowMap) => (
//     <View style={styles.rowBack}>
//       <Text>Left</Text>
//       <TouchableOpacity
//         style={[styles.backRightBtn, styles.backRightBtnLeft]}
//         onPress={() => closeRow(rowMap, data.item.key)}
//       >
//         <Text style={styles.backTextWhite}>Close</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.backRightBtn, styles.backRightBtnRight]}
//         onPress={() => deleteRow(rowMap, data.item.key)}
//       >
//         <Text style={styles.backTextWhite}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <SwipeListView
//         data={listData}
//         renderItem={renderItem}
//         renderHiddenItem={renderHiddenItem}
//         leftOpenValue={75}
//         rightOpenValue={-150}
//         previewRowKey={'0'}
//         previewOpenValue={-40}
//         previewOpenDelay={3000}
//         onRowDidOpen={onRowDidOpen}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },
//   rowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     justifyContent: 'center',
//     height: 50,
//   },
//   rowBack: {
//     alignItems: 'center',
//     backgroundColor: '#DDD',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
//   },
//   backRightBtn: {
//     alignItems: 'center',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
//   },
//   backRightBtnLeft: {
//     backgroundColor: 'blue',
//     right: 75,
//   },
//   backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 0,
//   },
// });

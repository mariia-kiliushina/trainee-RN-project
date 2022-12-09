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

  const renderItem = (data: {item: TPostKey}) => (
    <Pressable style={styles.rowVisible}>
      <Typography variant="18" fontType="bold">
        {data.item.title}
      </Typography>
      <Typography variant="16">{data.item.body}</Typography>
    </Pressable>
  );

  const renderHiddenItem = (data: {item: TPostKey}, rowMap: any) => (
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

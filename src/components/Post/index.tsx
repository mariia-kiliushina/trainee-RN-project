import {StyleSheet, Pressable, View} from 'react-native';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {SwipeRow} from 'react-native-swipe-list-view';

type Props = {
  title: string;
  body: string;
};

const VisibleRow = ({title, body}: Props) => {
  return (
    <Pressable style={styles.pressableCard}>
      <Typography variant="16" fontType="bold">
        {title}
      </Typography>
      <Typography variant="16">{body}</Typography>
    </Pressable>
  );
};
const HiddenRow = () => {
  return (
    <View>
      <Pressable style={{backgroundColor: 'red'}}>
        <Typography variant="16" fontType="bold">
          Delete
        </Typography>
      </Pressable>
    </View>
  );
};

export const Post = ({title, body}: Props) => {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  return (
    <SwipeRow
      rightOpenValue={-75}
      onPress={() => deleteRow(rowMap, data.item.key)}
    >
      <HiddenRow />
      <VisibleRow title={title} body={body} />
    </SwipeRow>
  );
};

const styles = StyleSheet.create({
  pressableCard: {
    backgroundColor: COLORS.cardFiller,
    marginBottom: 10,
    borderRadius: 6,
    padding: 15,
  },
});

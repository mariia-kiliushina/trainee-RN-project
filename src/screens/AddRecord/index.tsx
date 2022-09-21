import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {FlatListItem} from 'components/FlatListItem';
import {Post} from 'src/types';

export const AddRecord = () => {
  const [records, setRecords] = useState<Array<Post>>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(parsedRecords => setRecords(parsedRecords));
  }, []);
  const _renderItem: ListRenderItem<Post> = ({item}) => {
    return <FlatListItem title={item.title} body={item.body} />;
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={records}
        renderItem={_renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
  },

  navigationButton: {
    position: 'absolute',
    top: '85%',
    right: '5%',
    width: '60%',
  },
  iconStyle: {
    marginRight: 0,
  },
});

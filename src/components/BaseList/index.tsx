import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';

export type BaseListProps<Option> = {
  options: Option[];
  renderItem: ListRenderItem<Option>;
};

export function BaseList<Option>({options, renderItem}: BaseListProps<Option>) {
  return (
    <FlatList<Option>
      style={styles.content}
      data={options}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingHorizontal: 16,
  },
});

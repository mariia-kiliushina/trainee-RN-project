import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from 'react-native';

export type BaseListProps<Option> = Omit<FlatListProps<Option>, 'data'> & {
  options: Option[];
  renderItem: ListRenderItem<Option>;
  keyExtractor: (item: Option, index: number) => string;
};

export function BaseList<Option>({
  options,
  renderItem,
  keyExtractor,
  ...props
}: BaseListProps<Option>) {
  return (
    <FlatList<Option>
      style={styles.content}
      data={options}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingHorizontal: 16,
  },
});

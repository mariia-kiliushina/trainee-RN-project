import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {FlatListItem} from 'components/FlatListItem';
import {Post} from 'src/types';
import {Button} from 'components/Button';
import {ModalWindow} from 'components/ModalWindow';
import {Typography} from 'src/components/Typography';

export const AddRecord = () => {
  const {width} = useWindowDimensions();
  const [records, setRecords] = useState<Array<Post>>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(parsedRecords => setRecords(parsedRecords))
      .catch(error => console.log(error.message));
  }, []);
  const _renderItem: ListRenderItem<Post> = ({item}) => {
    return <FlatListItem title={item.title} body={item.body} />;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [focusedInputTitle, setFocusedInputTitle] = useState(false);
  const [focusedInputBody, setFocusedInputBody] = useState(false);

  const onSave = () => {
    setIsModalOpen(!isModalOpen);

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: titleText,
        body: bodyText,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error.message));
    setTitleText('');
    setBodyText('');
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={records}
        renderItem={_renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <ModalWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Typography fontType="bold" variant="18">
          Add new post
        </Typography>
        <TextInput
          autoCapitalize="sentences"
          style={[styles.input, focusedInputTitle && styles.focusedInput]}
          onChangeText={text => setTitleText(text)}
          value={titleText}
          placeholder="Post title"
          onFocus={() => {
            setFocusedInputTitle(true);
          }}
          onBlur={() => {
            setFocusedInputTitle(false);
          }}
        />
        <TextInput
          autoCapitalize="sentences"
          style={[
            styles.input,
            styles.inputBody,
            focusedInputBody && styles.focusedInput,
          ]}
          onChangeText={text => setBodyText(text)}
          value={bodyText}
          placeholder="Post body"
          multiline={true}
          onFocus={() => {
            setFocusedInputBody(true);
          }}
          onBlur={() => {
            setFocusedInputBody(false);
          }}
        />
        <Button style={styles.saveButton} type="primary" onPress={onSave}>
          Save
        </Button>
      </ModalWindow>
      <Button
        type="primary"
        hitSlop={30}
        iconName="plusSquared"
        style={[styles.button, {height: 0.17 * width, width: 0.17 * width}]}
        iconStyle={styles.iconStyle}
        onPress={() => setIsModalOpen(true)}
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
  button: {
    bottom: '3%',
    right: '5%',
    position: 'absolute',
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {paddingHorizontal: 30, width: '100%'},
  navigationButton: {
    position: 'absolute',
    top: '85%',
    right: '5%',
    width: '60%',
  },
  iconStyle: {
    marginRight: 0,
  },
  input: {
    height: 40,
    margin: 12,
    color: COLORS.baseLight20,
    borderColor: COLORS.baseLight60,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    fontSize: 16,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  focusedInput: {
    borderColor: COLORS.primary,
  },
  inputBody: {
    height: 100,
  },
});

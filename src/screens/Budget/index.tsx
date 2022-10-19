import React from 'react';
import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
// import {Platform, StyleSheet, TextInput, View} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {COLORS} from 'src/constants/colors';

export const Budget = () => {
  return (
    <Container>
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />
      <Input label="Test" />

      {/* <View style={styles.shadow}>
        <TextInput style={styles.base} />
      </View> */}
    </Container>
  );
};

// const styles = StyleSheet.create({
//   layout: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   shadow: {
//     marginVertical: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: COLORS.shadow,
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 9,
//       },
//     }),
//     ...Platform.select({
//       android: {
//         elevation: 6,
//         shadowColor: 'red',
//         borderWidth: 3,
//         borderColor: 'transparent',
//         borderRadius: 6,
//       },
//     }),
//   },
//   base: {
//     height: 40,
//     backgroundColor: 'white',
//     borderRadius: 6,
//   },
// });

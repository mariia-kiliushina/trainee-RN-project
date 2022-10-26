import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {RootStackParamList} from 'src/navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Typography} from 'src/components/Typography';
import {Rectangle} from 'src/assets/svg';

type Props = NativeStackScreenProps<RootStackParamList, 'BottomSheetModal'>;

export const BottomSheetModal = ({navigation, route}: Props) => {
  const {children} = route.params;
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity style={[styles.flex, styles.background]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}
        style={styles.flex}
      >
        <View onStartShouldSetResponder={_ => true} style={styles.modalView}>
          <View style={styles.alignCenter}>
            <Rectangle />
            <Typography variant="16" textStyle={styles.text}>
              Select
            </Typography>
            <View style={[styles.bottomLine, {width}]} />

            {children}
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: '85%',
    paddingTop: 10,
    width: '100%',
  },
  background: {
    backgroundColor: COLORS.neutral500opaque,
  },

  text: {
    color: COLORS.warning500,
    fontWeight: '100',
    marginTop: 27,
  },
  bottomLine: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
    paddingTop: 15,
  },
});

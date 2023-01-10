import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {useNavigation} from '@react-navigation/native';
import {ReactNode} from 'react';

type TProps = {
  variant: 'bottom' | 'pop';
  contentPositioning?: ViewStyle;
  modalViewStyle?: ViewStyle;
  children: ReactNode;
  background?: 'transparent' | 'grayish';
};
export const ModalOverlay = ({
  variant,
  contentPositioning,
  children,
  modalViewStyle,
  background = 'grayish',
}: TProps) => {
  const navigation = useNavigation();

  const conditionalModalViewStyle =
    variant === 'bottom' ? styles.modalViewBottom : styles.modalViewPop;

  const backgroundColor =
    background === 'grayish' ? COLORS.neutral500opaque : 'transparent';

  return (
    <TouchableOpacity style={[styles.flex, {backgroundColor: backgroundColor}]}>
      <Pressable
        style={[styles.flex, contentPositioning]}
        onPress={navigation.goBack}
      >
        <View
          onStartShouldSetResponder={_ => true}
          style={[conditionalModalViewStyle, modalViewStyle]}
        >
          {children}
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modalViewBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: '80%',
    width: '100%',
  },
  modalViewPop: {
    backgroundColor: 'white',
    borderRadius: 30,
    minHeight: '20%',
    padding: 20,
    justifyContent: 'center',
  },
});

import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RootStackScreenProps} from 'src/navigation/types';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

export type TPopUpModalParams = {
  body: string;
  buttonText?: string;
  onButtonPress?: (arg: any) => void;
  secondButtonText?: string;
  onSecondButtonPress?: (arg: any) => void;
};

export const PopUpModal = ({
  navigation,
  route,
}: RootStackScreenProps<'PopUpModal'>) => {
  const {
    body,
    buttonText,
    onButtonPress,
    secondButtonText,
    onSecondButtonPress,
  } = route.params;

  return (
    <TouchableOpacity style={styles.background}>
      <Pressable style={styles.pressableWraper} onPress={navigation.goBack}>
        <View onStartShouldSetResponder={_ => true} style={styles.modalView}>
          <Typography variant="16" fontType="bold" textStyle={styles.text}>
            {body}
          </Typography>
          {secondButtonText && (
            <Button type="secondary" onPress={onSecondButtonPress}>
              <Typography>{secondButtonText}</Typography>
            </Button>
          )}
          <Button type="primary" onPress={onButtonPress}>
            <Typography>{buttonText}</Typography>
          </Button>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressableWraper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    minHeight: '20%',
    padding: 20,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: COLORS.neutral500opaque,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

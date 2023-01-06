import {StyleSheet} from 'react-native';
import {RootStackScreenProps} from 'src/navigation/types';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {ModalOverlay} from 'src/components/ModalOverlay';

export type TPopUpModalParams = {
  body: string;
  buttonText: string;
  onButtonPress?: () => void;
  secondButtonText?: string;
  onSecondButtonPress?: () => void;
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

  const buttonProxy = () => {
    navigation.goBack();
    onButtonPress && onButtonPress();
  };

  const secondButtonProxy = () => {
    navigation.goBack();
    onSecondButtonPress && onSecondButtonPress();
  };

  return (
    <ModalOverlay variant="pop" contentPositioning={styles.contentPositioning}>
      <Typography variant="16" fontType="bold" textStyle={styles.text}>
        {body}
      </Typography>
      {secondButtonText && (
        <Button type="secondary" onPress={secondButtonProxy}>
          <Typography>{secondButtonText}</Typography>
        </Button>
      )}
      <Button type="primary" onPress={buttonProxy}>
        <Typography>{buttonText}</Typography>
      </Button>
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  contentPositioning: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
});

import {Container} from 'src/components/Container';
import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {HomeTabScreenProps} from 'src/navigation/types';

export const Budget = ({navigation}: HomeTabScreenProps<'Budget'>) => {
  const onNavigate = () => {
    navigation.navigate('AddRecord');
  };

  return (
    <Container>
      <Typography>Budget</Typography>
      <Button onPress={onNavigate} type="primary">
        Go to another screen
      </Button>
    </Container>
  );
};

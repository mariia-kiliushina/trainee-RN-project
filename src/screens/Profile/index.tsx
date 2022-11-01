import {Container} from 'src/components/Container';
import {ImageType, ProfilePhoto} from 'components/ProfilePhoto';
import {useEffect, useState} from 'react';

export const Profile = () => {
  const [image, setImage] = useState<ImageType>({
    data: '',
    mime: '',
  });

  useEffect(() => {}, [image]);

  return (
    <Container>
      <ProfilePhoto setImageParent={setImage} />
    </Container>
  );
};

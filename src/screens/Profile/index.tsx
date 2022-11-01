import {Container} from 'src/components/Container';
import {ProfilePhoto} from 'components/ProfilePhoto';
import {useEffect, useState} from 'react';

export const Profile = () => {
  const [image, setImage] = useState<{
    data: string | null | undefined;
    mimeType: string;
  }>({
    data: '',
    mimeType: '',
  });

  useEffect(() => {
    console.log(`image.data--> ${image.data}`);
  }, [image]);

  return (
    <Container>
      <ProfilePhoto setImageParent={setImage} />
    </Container>
  );
};

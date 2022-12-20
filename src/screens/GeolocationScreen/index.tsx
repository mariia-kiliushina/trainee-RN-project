import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';

export const GeolocationScreen = () => {
  const [coordinates, setCoordinates] = useState<Geolocation.GeoCoordinates>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCoordinates(position.coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  return (
    <Container viewType="fixed" contentLayout={styles.contentLayout}>
      <Typography>Hehe</Typography>
      {coordinates && (
        <Typography>{JSON.stringify(coordinates.latitude)}</Typography>
      )}
      {coordinates && (
        <Typography>{JSON.stringify(coordinates.longitude)}</Typography>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
});

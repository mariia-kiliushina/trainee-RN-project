import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';

export const GeolocationScreen = () => {
  const [coordinates, setCoordinates] = useState<Geolocation.GeoCoordinates>();

  const initializeLocationTracking = useCallback(() => {
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

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (response === PermissionsAndroid.RESULTS.GRANTED) {
          initializeLocationTracking();
        }
      }
    })();
  }, [initializeLocationTracking]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        const response = await Geolocation.requestAuthorization('whenInUse');
        if (response === 'granted') {
          initializeLocationTracking();
        }
      }
    })();
  }, [initializeLocationTracking]);

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

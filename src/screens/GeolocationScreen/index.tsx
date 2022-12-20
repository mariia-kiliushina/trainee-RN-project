import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, LatLng} from 'react-native-maps';
import {Container} from 'src/components/Container';

const initialRegion = {
  latitude: 41.6397547,
  longitude: 41.6234405,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const GeolocationScreen = () => {
  const [coordinates, setCoordinates] = useState<LatLng>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          draggable
          title={'My draggable location'}
          description={"I'm here and I'm draggable"}
          coordinate={coordinates || initialRegion}
          onDragEnd={event => {
            setCoordinates(event.nativeEvent.coordinate);
          }}
        />
      </MapView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
  map: {
    flex: 1,
  },
});

import {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, LatLng} from 'react-native-maps';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {RootStackScreenProps} from 'src/navigation/types';

const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};

export const GeolocationScreen = ({
  navigation,
}: RootStackScreenProps<'GeolocationScreen'>) => {
  const [coordinates, setCoordinates] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const mapRef = useRef<MapView>(null);

  const goToMarker = useCallback(() => {
    console.log('goHome');
    mapRef?.current?.animateToRegion({...coordinates, ...deltas}, 1000);
  }, [mapRef, coordinates]);

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

  useEffect(() => {
    goToMarker();
  }, [goToMarker]);

  return (
    <View style={styles.flex}>
      <MapView ref={mapRef} style={styles.flex}>
        <Marker
          draggable
          title={'My draggable location'}
          description={"I'm here and I'm draggable"}
          coordinate={coordinates}
          onDragEnd={event => {
            setCoordinates(event.nativeEvent.coordinate);
          }}
        />
      </MapView>
      <View style={styles.apiWrapper}>
        <Button type="primary" onPress={goToMarker}>
          Go to marker
        </Button>
        <Button type="secondary" onPress={navigation.goBack}>
          Done
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  apiWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.neutral100opaque,
  },
});

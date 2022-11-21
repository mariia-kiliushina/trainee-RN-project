import VideoPlayer from 'react-native-video';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Loading} from 'src/components/Loading';
import {PressableIcon} from 'src/components/PressableIcon';
import {COLORS} from 'src/constants/colors';

type TPosition = 'front' | 'back';

export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const [video, setVideo] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [position, setPosition] = useState<TPosition>('back');

  const devices = useCameraDevices();
  const device = devices[position];

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(res => {
      setHasPermission(res === 'authorized');
    });
  }, []);

  useEffect(() => {
    console.log('RENDER');
    if (hasPermission === false) {
      Camera.requestCameraPermission().then(permission => {
        setHasPermission(permission === 'authorized');
      });
    }
  }, [hasPermission]);

  const turnCameraPosition = () => {
    setPosition(prevPosition => (prevPosition === 'back' ? 'front' : 'back'));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const startRecording = () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.startRecording({
        flash: 'on',
        onRecordingFinished: recordedVideo => {
          setVideo(recordedVideo.path);
          setIsRecording(false);
        },
        onRecordingError: error => console.error(error),
      });
    }
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const deleteRecording = () => {
    setVideo('');
  };

  if (device == null) {
    return <Loading />;
  }

  if (hasPermission && !video) {
    return (
      <View style={styles.flex}>
        <Camera
          ref={cameraRef}
          style={[styles.absolute, styles.cameraStyle]}
          device={device}
          isActive={true}
          video={true}
        />
        <Container
          style={[styles.flex, styles.containerStyle]}
          contentLayout={[styles.contentLayout]}
        >
          <PressableIcon
            style={styles.absolute}
            color={COLORS.neutral300}
            onPress={goBack}
            iconName="Cross"
          />
          <View style={[styles.absolute, styles.pressableWrapper]}>
            <PressableIcon
              color={COLORS.genericWhite}
              onPress={turnCameraPosition}
              iconName="Flip"
            />
            <PressableIcon
              onPress={isRecording ? stopRecording : startRecording}
              color={isRecording ? COLORS.genericWhite : 'red'}
              iconName={isRecording ? 'Stop' : 'Record'}
            />

            <PressableIcon disabled>
              <Image
                source={require('src/assets/face.gif')}
                style={styles.gifStyle}
              />
            </PressableIcon>
          </View>
        </Container>
      </View>
    );
  }

  if (video) {
    return (
      <View style={styles.flex}>
        <VideoPlayer
          source={{uri: video}}
          style={[styles.backgroundVideo, styles.absolute]}
          resizeMode={'cover'}
        />
        <Container
          style={[styles.flex, styles.containerStyle]}
          contentLayout={[styles.contentLayout]}
        >
          <View style={[styles.absolute, styles.pressableWrapper]}>
            <PressableIcon
              color={COLORS.genericWhite}
              onPress={deleteRecording}
              iconName="Reset"
            />
            <PressableIcon
              color={COLORS.omniPrimaryColor}
              onPress={goBack}
              iconName="Checkmark"
            />
            <PressableIcon disabled />
          </View>
        </Container>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  contentLayout: {
    paddingHorizontal: 0,
  },

  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  pressableWrapper: {
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.neutral200,
  },
  cameraStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  gifStyle: {
    width: '100%',
    height: '100%',
  },
});

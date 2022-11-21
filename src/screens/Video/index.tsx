import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import VideoPlayer from 'react-native-video';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {Loading} from 'src/components/Loading';
import {RoundMask} from 'src/components/RoundMask';
import {COLORS} from 'src/constants/colors';
import {RootStackScreenProps} from 'src/navigation/types';
import {Record, Checkmark, Flip, Cross, Reset, Stop} from 'src/assets/svg';

type TPosition = 'front' | 'back';

export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const [video, setVideo] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
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
    if (hasPermission === false) {
      Camera.requestCameraPermission().then(permission => {
        setHasPermission(permission === 'authorized');
      });
    }
  }, []);

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
        onRecordingFinished: video => setVideo(video.path),
        onRecordingError: error => console.error(error),
      });
    }
  };

  const stopRecording = () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const deleteRecording = () => {
    setVideo('');
  };

  let makeRecord = hasPermission && !video;
  let display = video;

  if (device == null) {
    return <Loading />;
  }

  if (makeRecord) {
    return (
      <>
        <View style={styles.flex}>
          <RoundMask />
          <Pressable style={styles.button} onPress={goBack}>
            <Cross color={'white'} />
          </Pressable>
          <Camera
            ref={cameraRef}
            style={styles.cameraStyle}
            device={device}
            isActive={true}
            video={true}
          />
          <View style={styles.pressableWrapper}>
            <Pressable style={styles.button} onPress={turnCameraPosition}>
              <Flip color={'white'} width={40} height={40} />
            </Pressable>
            <Pressable style={styles.button} onPress={startRecording}>
              <Record color={'red'} width={70} height={70} />
            </Pressable>
            <Pressable style={styles.button} onPress={stopRecording}>
              <Stop color={'white'} width={40} height={40} />
            </Pressable>
          </View>
        </View>
      </>
    );
  }

  if (display) {
    return (
      <View style={styles.flex}>
        <VideoPlayer source={{uri: video}} style={styles.backgroundVideo} />
        <View style={styles.pressableWrapper}>
          <Pressable style={styles.button} onPress={deleteRecording}>
            <Reset color={'white'} />
          </Pressable>
          <Pressable style={styles.button} onPress={goBack}>
            <Checkmark color={'green'} />
          </Pressable>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  pressableWrapper: {
    position: 'absolute',
    justifyContent: 'space-around',
    backgroundColor: COLORS.neutral300,
    flexDirection: 'row',
    width: '100%',
    bottom: 0,
  },

  cameraStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
});

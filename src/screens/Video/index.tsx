import VideoPlayer from 'react-native-video';
import {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Loading} from 'src/components/Loading';
import {Button} from 'src/components/Button';
import {ModalWindow} from 'src/components/ModalWindow';
import {PressableIcon} from 'src/components/PressableIcon';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

type TPosition = 'front' | 'back';

export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const [video, setVideo] = useState('');

  const [permission, setPermission] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const [position, setPosition] = useState<TPosition>('back');

  const devices = useCameraDevices();
  const device = devices[position];

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    Camera.requestCameraPermission().then(response => {
      setPermission(response);
    });
  }, [permission, navigation]);

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

  const isFocused = useIsFocused();

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
          <View style={[styles.absolute, styles.contentWrapper]}>
            <Typography variant="16" textStyle={styles.textStyle}>
              Make 2 cycles with your head
            </Typography>

            <View style={[styles.pressableWrapper]}>
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
          </View>
        </Container>
      </View>
    );
  }

  if (device) {
    return (
      <View style={styles.flex}>
        {permission === 'denied' && (
          <ModalWindow
            isModalOpen={permission === 'denied'}
            setIsModalOpen={() => {}}
            style={styles.modal}
          >
            <>
              <Typography textStyle={styles.text}>
                Biometrics is unavailable until camera permission is given
              </Typography>
              <Button type="secondary" onPress={() => navigation.goBack()}>
                <Typography>Go back</Typography>
              </Button>
            </>
          </ModalWindow>
        )}
        <Camera
          ref={cameraRef}
          style={[styles.absolute, styles.cameraStyle]}
          device={device}
          isActive={isFocused}
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

          <View style={[styles.absolute, styles.contentWrapper]}>
            <Typography variant="16" textStyle={styles.textStyle}>
              Make 2 cycles with your head
            </Typography>

            <View style={[styles.pressableWrapper]}>
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
                  source={require('src/assets/gif/face.gif')}
                  style={styles.gifStyle}
                />
              </PressableIcon>
            </View>
          </View>
        </Container>
      </View>
    );
  }

  return <Loading />;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modal: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
  absolute: {
    position: 'absolute',
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    flex: 1,
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: COLORS.neutral300opaque,
    justifyContent: 'center',
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  textStyle: {
    color: COLORS.genericWhite,
    textAlign: 'center',
    marginBottom: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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

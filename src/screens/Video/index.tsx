import VideoPlayer from 'react-native-video';
import {useRef, useState, useEffect} from 'react';
import {AppState, AppStateStatus, StyleSheet, View, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackScreenProps} from 'src/navigation/types';
import {PressableIcon} from 'src/components/PressableIcon';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {Loading} from 'src/components/Loading';

type TPosition = 'front' | 'back';

export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const insets = useSafeAreaInsets();

  const [video, setVideo] = useState('');

  const [permission, setPermission] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const [isForeground, setIsForeground] = useState(true);

  const isFocused = useIsFocused();

  const [position, setPosition] = useState<TPosition>('back');
  const devices = useCameraDevices();
  const device = devices[position];
  const areBothDevices = devices.front && devices.back;

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

  useEffect(() => {
    Camera.requestCameraPermission().then(response => {
      setPermission(response);
    });
  }, [permission, navigation]);

  const renderFooter = () => {
    if (video) {
      return (
        <>
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
        </>
      );
    }
    if (isRecording && isForeground) {
      return (
        <>
          <Typography variant="16" textStyle={styles.textStyle}>
            Make 2 cycles with your head
          </Typography>
          <View style={styles.pressableWrapper}>
            <PressableIcon disabled />
            <PressableIcon
              onPress={stopRecording}
              color={COLORS.genericWhite}
              iconName={'Stop'}
            />
            <View style={styles.gifContainer}>
              <Image
                source={require('src/assets/gif/face.gif')}
                style={styles.gifStyle}
              />
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <Typography variant="16" textStyle={styles.textStyle}>
          Make 2 cycles with your head
        </Typography>
        <View style={styles.pressableWrapper}>
          {areBothDevices ? (
            <PressableIcon
              color={COLORS.genericWhite}
              onPress={turnCameraPosition}
              iconName="Flip"
            />
          ) : (
            <PressableIcon disabled />
          )}
          <PressableIcon
            onPress={startRecording}
            color={COLORS.warningUltimate}
            iconName={'Record'}
          />
          <View style={styles.gifContainer}>
            <Image
              source={require('src/assets/gif/face.gif')}
              style={styles.gifStyle}
            />
          </View>
        </View>
      </>
    );
  };

  const renderContent = () => {
    if (video) {
      return (
        <VideoPlayer
          source={{uri: video}}
          style={styles.flex}
          resizeMode={'cover'}
        />
      );
    }
    if (device) {
      return (
        <Camera
          ref={cameraRef}
          style={styles.flex}
          device={device}
          isActive={isFocused && isForeground}
          video={true}
        />
      );
    }
  };
  const turnCameraPosition = () => {
    setPosition(prevPosition => (prevPosition === 'back' ? 'front' : 'back'));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const startRecording = () => {
    setIsRecording(true);
    if (cameraRef.current) {
      cameraRef.current.startRecording({
        onRecordingFinished: async recordedVideo => {
          setVideo(recordedVideo.path);
        },
        onRecordingError: error => {
          stopRecording();
          if (error?.code !== 'capture/inactive-source') {
            navigation.navigate('PopUpModal', {
              children: <Typography>Video recording error</Typography>,
            });
          }
        },
      });
    }
  };

  const stopRecording = () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setVideo('');
  };

  if (device == null) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      {renderContent()}

      <View style={styles.contentWrapper}>{renderFooter()}</View>

      <PressableIcon
        style={[styles.close, {top: insets.top}]}
        color={COLORS.neutral300}
        onPress={goBack}
        iconName="Cross"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: COLORS.neutral300opaque,
  },
  textStyle: {
    color: COLORS.genericWhite,
    textAlign: 'center',
    marginBottom: 15,
  },
  pressableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  gifStyle: {
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    left: 10,
  },
});

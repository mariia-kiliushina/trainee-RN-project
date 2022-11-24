import VideoPlayer from 'react-native-video';
import {useRef, useState, useEffect} from 'react';
import {AppState, AppStateStatus, StyleSheet, View, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackScreenProps} from 'src/navigation/types';
import {PressableIcon} from 'src/components/PressableIcon';
import {Typography} from 'src/components/Typography';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {Loading} from 'src/components/Loading';

type TPosition = 'front' | 'back';

const RecordingError = () => {
  const navigation = useNavigation();
  return (
    <>
      <Typography textStyle={styles.text}>Video recording error</Typography>
      <Button type="secondary" onPress={navigation.goBack}>
        <Typography>Go back</Typography>
      </Button>
    </>
  );
};
export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const devices = useCameraDevices();

  const [video, setVideo] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const [isForeground, setIsForeground] = useState(true);

  const [position, setPosition] = useState<TPosition>('back');
  const device = devices[position];
  const areBothDevices = devices.front && devices.back;

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

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
          <Typography
            variant="16"
            textStyle={[styles.text, styles.pressableText]}
          >
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
        <Typography
          variant="16"
          textStyle={[styles.text, styles.pressableText]}
        >
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
              children: <RecordingError />,
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

  if (device === undefined) {
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

  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
  pressableText: {
    color: COLORS.genericWhite,
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

import {useRef, useState, useEffect} from 'react';
import {
  AppState,
  AppStateStatus,
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import {useIsFocused} from '@react-navigation/core';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackScreenProps} from 'src/navigation/types';
import {PressableIcon} from 'src/components/PressableIcon';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {Loading} from 'src/components/Loading';

export const Video = ({navigation}: RootStackScreenProps<'Video'>) => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  const [video, setVideo] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const [isForeground, setIsForeground] = useState(true);

  const [isFront, setIsFront] = useState(true);

  const device = isFront ? devices.front : devices.back;

  const areBothDevices = devices.front && devices.back;

  useEffect(() => {
    if (!devices.front) {
      setIsFront(false);
    } else {
      setIsFront(true);
    }
  }, [devices.front]);

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
          <View style={styles.pressableWrapper}>
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
    if (isRecording) {
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
          style={[
            styles.flex,
            // For unknown reason anroid rotates video from front camera
            Platform.OS === 'android' && isFront && {transform: [{scaleX: -1}]},
          ]}
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
    setIsFront(currentIsFront => !currentIsFront);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const startRecording = () => {
    setIsRecording(true);

    cameraRef.current?.startRecording({
      onRecordingFinished: async recordedVideo => {
        setIsRecording(false);

        setVideo(recordedVideo.path);
      },
      onRecordingError: error => {
        stopRecording();

        if (error?.code !== 'capture/inactive-source') {
          navigation.navigate('PopUpModal', {
            body: 'Video recording error',
            buttonText: 'Go back',
            onButtonPress: navigation.goBack,
          });
        }
      },
    });
  };

  const stopRecording = () => {
    setIsRecording(false);

    cameraRef.current?.stopRecording();
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
      <View
        style={[styles.contentWrapper, {paddingBottom: insets.bottom || 10}]}
      >
        {renderFooter()}
      </View>
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
    paddingTop: 10,
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

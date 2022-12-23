import {
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  TapGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureEvent,
  RectButton,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {ToDos} from './mock';

const {width} = Dimensions.get('window');
const SIZE = 120;

export const Animations = () => {
  const rotation = useSharedValue(0);
  const offset = useSharedValue(0);
  const pressedForColor = useSharedValue(false);
  const pressedForScaleAndColor = useSharedValue(false);
  const pressedForColorSecondScreen = useSharedValue(false);
  const pressedForScaleAndColorSecondScreen = useSharedValue(false);
  const pressedForPosition = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const startingPositionCtx = 0;
  const xWithContext = useSharedValue(startingPositionCtx);
  const yWithContext = useSharedValue(startingPositionCtx);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotationForGesture = useSharedValue(0);
  const rotationForGestureSaved = useSharedValue(0);
  const startContextForPanHandler = useSharedValue({x: 0, y: 0});
  const startContextForPanGesture = useSharedValue({x: 0, y: 0});
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(20);

  const useGetBubbleStyle = (
    baseX: Animated.SharedValue<number>,
    baseY: Animated.SharedValue<number>,
  ) => {
    const derivedX = useDerivedValue(() => {
      return withSpring(baseX.value);
    });

    const derivedY = useDerivedValue(() => {
      return withSpring(baseY.value);
    });
    const bubbleStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: derivedX.value}, {translateY: derivedY.value}],
      };
    });
    return {derivedX, derivedY, bubbleStyle};
  };

  const {
    derivedX: mainX,
    derivedY: mainY,
    bubbleStyle,
  } = useGetBubbleStyle(translateX, translateY);

  const {
    derivedX: firstFollowerX,
    derivedY: firstFollowerY,
    bubbleStyle: firstFollowerBubbleStyle,
  } = useGetBubbleStyle(mainX, mainY);

  const {bubbleStyle: secondFollowerBubbleStyle} = useGetBubbleStyle(
    firstFollowerX,
    firstFollowerY,
  );

  const rotateStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#FF3C33',
      transform: [{rotateZ: withTiming(`${rotation.value}deg`)}],
    };
  });

  const offsetStyle = useAnimatedStyle(() => {
    offset.value > 100 ? (offset.value = 0) : offset.value;
    return {
      backgroundColor: '#33AAFF',
      transform: [
        {
          translateX: withSpring(offset.value * 1.1),
        },
      ],
    };
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#33F3FF',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  const positionCtxStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#DC33FF',
      transform: [
        {translateX: xWithContext.value},
        {translateY: yWithContext.value},
      ],
    };
  });

  const colorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForColor.value ? '#F2FF33' : '#A633FF',
    };
  });

  const scaleAndColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForScaleAndColor.value ? '#33FFA5' : '#FFA533',
      transform: [{scale: withSpring(pressedForScaleAndColor.value ? 1.2 : 1)}],
    };
  });

  const colorStyleSecondScreen = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForColorSecondScreen.value
        ? '#F2FF33'
        : '#A633FF',
    };
  });

  const scaleAndColorStyleSecondScreen = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForScaleAndColorSecondScreen.value
        ? '#33FFA5'
        : '#FFA533',
      transform: [
        {
          scale: withSpring(
            pressedForScaleAndColorSecondScreen.value ? 1.2 : 1,
          ),
        },
      ],
    };
  });

  const rotationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#33FFA5',
      transform: [
        {rotateZ: `${(rotationForGesture.value / Math.PI) * 180}deg`},
      ],
    };
  });

  const scalePinchStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value)}],
    };
  });

  const tapHandlerColor = useAnimatedGestureHandler<
    GestureEvent<TapGestureHandler>
  >({
    onStart: () => {
      pressedForColor.value = true;
    },
    onEnd: () => {
      pressedForColor.value = false;
    },
  });

  const tapHandlerScale = useAnimatedGestureHandler<
    GestureEvent<TapGestureHandler>
  >({
    onStart: () => {
      pressedForScaleAndColor.value = true;
    },
    onEnd: () => {
      pressedForScaleAndColor.value = false;
    },
  });

  const dragHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      pressedForPosition.value = true;
    },
    onActive: event => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: () => {
      pressedForPosition.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const dragHandlerWithContext =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        startContextForPanHandler.value = {
          x: xWithContext.value,
          y: yWithContext.value,
        };
      },
      onActive: event => {
        xWithContext.value =
          startContextForPanHandler.value.x + event.translationX;
        yWithContext.value =
          startContextForPanHandler.value.y + event.translationY;
      },
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const longPressGestureColors = Gesture.LongPress()
    .onBegin(() => {
      pressedForColorSecondScreen.value = true;
    })
    .onFinalize(() => {
      pressedForColorSecondScreen.value = false;
    });

  const longPressGestureScaleAndColors = Gesture.LongPress()
    .onBegin(() => {
      pressedForScaleAndColorSecondScreen.value = true;
    })
    .onFinalize(() => {
      pressedForScaleAndColorSecondScreen.value = false;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotationForGesture.value = rotationForGestureSaved.value + event.rotation;
    })
    .onEnd(() => {
      rotationForGestureSaved.value = rotationForGesture.value;
    });

  const dragAndBubbleGesture = Gesture.Pan()
    .onStart(() => {
      startContextForPanGesture.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(event => {
      translateX.value = startContextForPanGesture.value.x + event.translationX;
      translateY.value = startContextForPanGesture.value.y + event.translationY;
    })
    .onEnd(() => {
      translateX.value =
        Math.abs(translateX.value) < width / 2 ? 0 : width - SIZE;
    });

  const renderLeftActions = () => {
    return (
      <RectButton style={[styles.leftAction, {backgroundColor: '#FFA533'}]}>
        <Typography textStyle={styles.textStyle}>Archive</Typography>
      </RectButton>
    );
  };

  const renderRightActions = () => {
    return (
      <>
        <RectButton style={[styles.action, {backgroundColor: `#FF3C33`}]}>
          <Typography textStyle={styles.textStyle}>Delete</Typography>
        </RectButton>
        <RectButton style={[styles.action, {backgroundColor: '#33AAFF'}]}>
          <Typography textStyle={styles.textStyle}>Mark as unread</Typography>
        </RectButton>
        <RectButton
          style={[styles.action, {backgroundColor: COLORS.omniPrimaryColor}]}
        >
          <Typography textStyle={styles.textStyle}>More</Typography>
        </RectButton>
      </>
    );
  };

  return (
    <View style={styles.flex}>
      <ScrollView horizontal={true} pagingEnabled={true}>
        <Container style={styles.containerStyle}>
          <Typography>GestureHandlers</Typography>
          <View style={styles.wrapper}>
            <Pressable onPress={() => (rotation.value += 20)}>
              <Animated.View style={[styles.quadro, rotateStyle]} />
            </Pressable>
            <Pressable
              onPress={() => {
                offset.value += 20;
              }}
            >
              <Animated.View style={[styles.quadro, offsetStyle]} />
            </Pressable>
          </View>
          <View style={styles.wrapper}>
            <TapGestureHandler onGestureEvent={tapHandlerColor}>
              <Animated.View style={[styles.quadro, colorStyle]} />
            </TapGestureHandler>
            <TapGestureHandler onGestureEvent={tapHandlerScale}>
              <Animated.View style={[styles.quadro, scaleAndColorStyle]} />
            </TapGestureHandler>
          </View>
          <View style={styles.wrapper}>
            <PanGestureHandler onGestureEvent={dragHandler}>
              <Animated.View style={[styles.smallCircle, positionStyle]} />
            </PanGestureHandler>
            <PanGestureHandler onGestureEvent={dragHandlerWithContext}>
              <Animated.View style={[styles.smallCircle, positionCtxStyle]} />
            </PanGestureHandler>
          </View>
        </Container>
        <Container style={styles.containerStyle}>
          <Typography>GestureDetector</Typography>
          <View style={styles.wrapper}>
            <GestureDetector gesture={longPressGestureColors}>
              <Animated.View style={[styles.quadro, colorStyleSecondScreen]} />
            </GestureDetector>
            <GestureDetector gesture={longPressGestureScaleAndColors}>
              <Animated.View
                style={[styles.quadro, scaleAndColorStyleSecondScreen]}
              />
            </GestureDetector>
          </View>
        </Container>
        <Container style={styles.containerStyle}>
          <Typography>GestureDetector</Typography>
          <Typography>Zoom</Typography>
          <View style={styles.wrapperColumn}>
            <GestureDetector gesture={pinchGesture}>
              <View style={[styles.containerCentering, {width}]}>
                <Animated.View style={[styles.bigCircle, scalePinchStyle]} />
              </View>
            </GestureDetector>
          </View>
        </Container>
        <Container style={styles.containerStyle}>
          <Typography>GestureDetector</Typography>
          <Typography>Rotate</Typography>
          <View style={styles.wrapperColumn}>
            <GestureDetector gesture={rotationGesture}>
              <View style={[styles.containerCentering, {width}]}>
                <Animated.View
                  style={[styles.quadro, styles.bigQuadro, rotationStyle]}
                />
              </View>
            </GestureDetector>
          </View>
        </Container>

        <Container
          style={styles.containerStyle}
          contentContainerStyle={{paddingHorizontal: 0}}
        >
          <Typography>Bubbles</Typography>
          <View style={styles.followerWrapper}>
            <Animated.View
              style={[
                styles.smallCircle,
                {backgroundColor: '#A633FF', height: SIZE * 0.6},
                secondFollowerBubbleStyle,
              ]}
            />
          </View>
          <View style={styles.followerWrapper}>
            <Animated.View
              style={[
                styles.smallCircle,
                {backgroundColor: '#33FFA5', height: SIZE * 0.8},
                firstFollowerBubbleStyle,
              ]}
            />
          </View>
          <GestureDetector gesture={dragAndBubbleGesture}>
            <Animated.View
              style={[
                styles.smallCircle,
                {backgroundColor: '#33AAFF', position: 'absolute'},
                bubbleStyle,
              ]}
            />
          </GestureDetector>
        </Container>
        <Container style={styles.containerStyle}>
          <Typography>Swipable</Typography>
          {ToDos.map(todo => {
            return (
              <Swipeable
                key={todo}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
              >
                <Typography
                  variant="18"
                  style={styles.typographyStyle}
                  textStyle={styles.textStyle}
                >
                  {todo}
                </Typography>
              </Swipeable>
            );
          })}
        </Container>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  containerStyle: {
    width,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
  },
  wrapperColumn: {
    flex: 1,
    alignItems: 'center',
  },
  quadro: {
    height: 120,
    aspectRatio: 1,
    borderRadius: 6,
    marginRight: 30,
  },
  bigQuadro: {
    height: 200,
  },

  containerCentering: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircle: {
    aspectRatio: 1,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFA533',
    marginRight: 30,
  },
  bigCircle: {
    aspectRatio: 1,
    height: SIZE * 2,
    borderRadius: SIZE,
    backgroundColor: '#FFA533',
  },
  textStyle: {
    color: COLORS.genericWhite,
    textAlign: 'center',
  },
  typographyStyle: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.genericWhite,
    justifyContent: 'center',
    height: 50,
    backgroundColor: COLORS.cardFiller,
  },
  action: {
    flex: 0.2,
    color: COLORS.genericWhite,
    justifyContent: 'center',
  },
  leftAction: {
    flex: 0.5,
    color: COLORS.genericWhite,
    justifyContent: 'center',
  },
  followerWrapper: {
    height: SIZE,
    aspectRatio: 1,
    position: 'absolute',
    justifyContent: 'center',
  },
});

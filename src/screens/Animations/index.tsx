import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {Container} from 'src/components/Container';
import {COLORS} from 'constants/colors';

export const Animations = () => {
  const rotation = useSharedValue(0);
  const offset = useSharedValue(0);
  const pressedForColor = useSharedValue(false);
  const pressedForScale = useSharedValue(false);
  const pressedForPosition = useSharedValue(false);
  const pressedForPositionCtx = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const startingPositionCtx = 0;
  const xCtx = useSharedValue(startingPositionCtx);
  const yCtx = useSharedValue(startingPositionCtx);

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
      transform: [{translateX: xCtx.value}, {translateY: yCtx.value}],
    };
  });

  const colorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForColor.value ? '#F2FF33' : '#A633FF',
    };
  });
  const scaleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedForScale.value ? '#33FFA5' : '#FFA533',
      transform: [{scale: withSpring(pressedForScale.value ? 1.2 : 1)}],
    };
  });

  const tapHandlerColor = useAnimatedGestureHandler({
    onStart: () => {
      pressedForColor.value = true;
    },
    onEnd: () => {
      pressedForColor.value = false;
    },
  });

  const tapHandlerScale = useAnimatedGestureHandler({
    onStart: () => {
      pressedForScale.value = true;
    },
    onEnd: () => {
      pressedForScale.value = false;
    },
  });
  const dragHandler = useAnimatedGestureHandler({
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
  const dragHandlerCtx = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      pressedForPositionCtx.value = true;
      ctx.startXCtx = xCtx.value;
      ctx.startYCtx = yCtx.value;
    },
    onActive: (event, ctx) => {
      xCtx.value = ctx.startXCtx + event.translationX;
      yCtx.value = ctx.startYCtx + event.translationY;
    },
  });

  return (
    <Container style={styles.style}>
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
          <Animated.View style={[styles.quadro, scaleStyle]} />
        </TapGestureHandler>
      </View>
      <View style={styles.wrapper}>
        <PanGestureHandler onGestureEvent={dragHandler}>
          <Animated.View style={[styles.circle, positionStyle]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={dragHandlerCtx}>
          <Animated.View style={[styles.circle, positionCtxStyle]} />
        </PanGestureHandler>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.genericWhite,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
  },
  quadro: {
    height: 120,
    width: 120,
    borderRadius: 6,
    marginRight: 30,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginRight: 30,
  },
});

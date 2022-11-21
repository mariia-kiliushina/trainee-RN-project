import {StyleSheet, View} from 'react-native';
import Svg, {Circle, Rect, Defs, Mask} from 'react-native-svg';

export const RoundMask = () => {
  return (
    <View style={styles.layout}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Circle r="45" cx="50" cy="50" />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
          fill-opacity="0"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});

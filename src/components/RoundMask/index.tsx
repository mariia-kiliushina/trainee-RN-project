import {StyleSheet, View} from 'react-native';
import Svg, {Rect, Circle, Defs, Mask} from 'react-native-svg';

export const RoundMask = () => {
  return (
    <View style={[styles.layout]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="white" opacity={0.8} />
            <Circle r="45" cx="50" cy="50" fill-opacity="0" />
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" fill="#FF1505" mask="url(#mask)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});

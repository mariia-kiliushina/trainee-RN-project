import Svg, {Circle, Rect, Defs, Mask} from 'react-native-svg';

export const RoundMask = () => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Circle r="30%" cx="50%" cy="50%" fill="black" />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.8)"
        mask="url(#mask)"
        fill-opacity="0"
      />
    </Svg>
  );
};

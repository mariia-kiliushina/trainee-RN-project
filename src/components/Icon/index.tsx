import React from 'react';
import {ColorValue, StyleProp, ViewStyle} from 'react-native';
import Cross from '../../assets/svg/cross.svg';
import Add from '../../assets/svg/add.svg';
import Pen from '../../assets/svg/pen.svg';

export type TIconTypes = 'cross' | 'add' | 'pen';
type Props = {
  name: TIconTypes;
  width: number;
  height: number;
  style: StyleProp<ViewStyle>;
  color: ColorValue;
};

const Icon = ({name, height, width, color, style}: Props) => {
  switch (name) {
    case 'cross':
      return (
        <Cross width={width} height={height} color={color} style={style} />
      );
    case 'add':
      return <Add width={width} height={height} color={color} style={style} />;
    case 'pen':
      return <Pen width={width} height={height} color={color} style={style} />;
    default:
      return null;
  }
};

export default Icon;

export {default as PlusSquared} from './plus-squared.svg';
export {default as Pen} from './pen.svg';
export {default as Cross} from './cross.svg';
export {default as Arrow} from './arrow.svg';
export {default as User} from './user.svg';
export {default as HomeIcon} from './home.svg';
export {default as Budget} from './pie-chart.svg';
export {default as Settings} from './settings.svg';
export {default as TransactionIcon} from './transaction.svg';
export {default as Plus} from './plus-filled.svg';
export {default as Dots} from './dots.svg';

import {SvgProps} from 'react-native-svg';
import {FC} from 'react';
import PlusSquared from './plus-squared.svg';
import Pen from './pen.svg';
import Cross from './cross.svg';
import Arrow from './arrow.svg';
import User from './user.svg';
import HomeIcon from './home.svg';
import Budget from './pie-chart.svg';
import TransactionIcon from './transaction.svg';
import Plus from './plus-filled.svg';
import Dots from './dots.svg';

export type IconsType = Record<string, FC<SvgProps>>;

export const icons: IconsType = {
  plus: PlusSquared,
  addRecord: Plus,
  pen: Pen,
  cross: Cross,
  arrow: Arrow,
  profile: User,
  home: HomeIcon,
  budget: Budget,
  transaction: TransactionIcon,
  dots: Dots,
};

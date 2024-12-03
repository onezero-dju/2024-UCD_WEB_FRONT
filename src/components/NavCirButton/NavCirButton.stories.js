import { NavCirButton } from './NavCirButton';

export default {
  title: 'Components/NavCirButton',
  component: NavCirButton,
  tags: ['autodocs'],
};

export const Default = {
    args: {
      dataId: 1,
      selectedId: 2,
      onClick: undefined,
    },
};

export const Clicked = {
    args: {
      dataId: 3,
      selectedId: 3,
      onClick: undefined,
    },
};

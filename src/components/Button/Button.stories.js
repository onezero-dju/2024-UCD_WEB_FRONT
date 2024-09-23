import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Primary = {
    args: {
      primary: true,
      label: 'Button',
    },
};

export const Secondary = {
    args: {
      label: 'Button',
    },
};

export const Medium = {
  args: {
    size: 'medium',
    label: 'Button',
  },
};

export const Full = {
  args: {
    size: 'full',
    label: 'Button',
  },
};

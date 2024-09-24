import { SectionLinkItem } from './SectionLinkItem';
import { BrowserRouter } from 'react-router-dom'; 
import '../../App.css';

export default {
  title: 'Components/SectionLinkItem',
  component: SectionLinkItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = {
    args: {
        id: 1,
    },
};

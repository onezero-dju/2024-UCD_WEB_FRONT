import SummaryContainer from './SummaryContainer';

export default {
  title: 'Components/Summary',
  component: SummaryContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    
  },
};

const Template = (args) => <SummaryContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
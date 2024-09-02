import MeetingContainer from './MeetingContainer';

export default {
  title: 'Components/MeetingContainer',
  component: MeetingContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    
  },
}

const Template = (args) => <MeetingContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
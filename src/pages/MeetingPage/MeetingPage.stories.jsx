import MeetingPage from './MeetingPage';

export default {
  title: 'Page/MeetingPage',
  component: MeetingPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    
  },
}

const Template = (args) => <MeetingPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
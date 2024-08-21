import MainPage from './MainPage';

export default {
  title: 'Page/MainPage',
  component: MainPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    
  },
}

const Template = (args) => <MainPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
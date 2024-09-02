import LoginPage from './LoginPage';

export default {
  title: 'Page/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    
  },
}

const Template = (args) => <LoginPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
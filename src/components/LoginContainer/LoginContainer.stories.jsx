import LoginContainer from './LoginContainer';

export default {
  title: 'Components/LoginContainer',
  component: LoginContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    
  },
}

const Template = (args) => <LoginContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
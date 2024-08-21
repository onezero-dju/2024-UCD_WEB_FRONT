import MainContainer from './MainContainer';

export default {
  title: 'Components/MainContainer',
  component: MainContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    
  },
}

const Template = (args) => <MainContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
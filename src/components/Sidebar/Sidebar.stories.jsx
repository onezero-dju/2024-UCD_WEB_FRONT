import SidebarContainer from './SidebarContainer';

export default {
  title: 'Components/SidebarContainer',
  component: SidebarContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    
  },
}

const Template = (args) => <SidebarContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
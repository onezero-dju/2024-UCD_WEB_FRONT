import ProfileModal from "./ProfileModal";

export default {
    title: 'Components/ProfileModal',
    component: ProfileModal,
    argTypes: {
        setModalOpen: {control: 'boolean'}
    }
};

const Template = (args) => <ProfileModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    setModalOpen: True
}
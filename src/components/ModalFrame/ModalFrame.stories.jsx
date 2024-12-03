import ProfileModal from "./ModalFrame";

export default {
    title: 'Components/ModalFrame',
    component: ProfileModal,
    argTypes: {
        setModalOpen: {control: 'boolean'}
    },
    // parameters: {
    //     layout: 'centered',
    // }
};

const Template = (args) => <ProfileModal {...args} />;

export const ModalOpen = Template.bind({});
ModalOpen.args = {
    setModalOpen: true
}

export const ModalClose = Template.bind({});
ModalClose.args = {
    setModalOpen: false
}
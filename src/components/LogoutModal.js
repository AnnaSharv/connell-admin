import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const LogoutModal = (props) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <span onClick={showModal}>
        Log out
      </span>
      <Modal
        // title="Modal"
        open={open}
        onOk={() => {
          hideModal()
          props.logout()
        }}
        onCancel={hideModal}
        okText="Sign out"
        cancelText="Cancel"
      >
        <p>Log out?</p>
      </Modal>
    </>
  );
};


export default LogoutModal;
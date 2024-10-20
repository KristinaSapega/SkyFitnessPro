import Login from "../components/Login";
import Main from "../components/Main";
import Modal from "../modal/Modal";
import React, { useState } from 'react';

type IAppProps = {};

export function LoginPage(props: IAppProps) {
  const [isModalOpen, setModalOpen] = useState(true);
  return (
    <div>
      <Main />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Login />
      </Modal>
    </div>
  );
}

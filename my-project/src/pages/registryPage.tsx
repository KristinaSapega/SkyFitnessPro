import React, { useState } from 'react';
import Main from "../components/Main";
import Registry from "../components/Registry";
import Modal from "../modal/Modal";
type IAppProps = {};

export function RegistryPage(props: IAppProps) {
  const [isModalOpen, setModalOpen] = useState(true);
  return (
    <>
      <Main />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <Registry />
        </div>
      </Modal>
    </>
  );
}

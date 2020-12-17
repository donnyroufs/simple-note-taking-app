import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export interface IDeleteModalProps {
  isOpen: boolean;
  onYes: () => void;
  onClose: () => void;
}

export const DeleteModal: React.FC<IDeleteModalProps> = ({
  isOpen,
  onYes,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader>Delete Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Delete category and it's content?</ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onYes}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

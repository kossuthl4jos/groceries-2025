import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from 'react-bootstrap';
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Item } from '~/types';

interface CompleteItemModalProps {
  completingItem: boolean;
  stopCompletingItem: VoidFunction;
  item: Item;
  handleOnClickSave: (completedBy: string, price: string) => void;
  handleOnClickDelete: VoidFunction;
}

export const CompleteItemModal = ({
  item,
  completingItem,
  stopCompletingItem,
  handleOnClickSave,
  handleOnClickDelete,
}: CompleteItemModalProps) => {
  const [completedBy, setCompletedBy] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Modal show={completingItem} onHide={stopCompletingItem} centered>
      <ModalHeader>
        <ModalTitle>{item?.name}</ModalTitle>
        <Button variant="danger" onClick={handleOnClickDelete}>
          DELETE
        </Button>
      </ModalHeader>
      <ModalBody>
        <FormGroup controlId="itemPrice">
          <InputGroup>
            <InputGroupWithExtras.Text>€</InputGroupWithExtras.Text>
            <FormControl
              type="number"
              placeholder="Price"
              aria-describedby="inputGroupPrepend"
              onChange={(e: ChangeEvent) => {
                setPrice((e.target as HTMLInputElement).value);
              }}
              required
            />
          </InputGroup>
        </FormGroup>
        <FormControl
          type="text"
          placeholder="Purchased by"
          onChange={(e: ChangeEvent) => {
            setCompletedBy((e.target as HTMLInputElement).value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ButtonToolbar className="justify-content-between">
          <ButtonGroup className="pull-left" aria-label="First group"></ButtonGroup>
          <ButtonGroup aria-label="Second group">
            <Button variant="secondary" onClick={stopCompletingItem}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleOnClickSave(completedBy, price)}
              disabled={completedBy === '' || price === ''}>
              Save
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </ModalFooter>
    </Modal>
  );
};

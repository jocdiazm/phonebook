/* eslint-disable react/prop-types */
import { ActionIcon, Button, Modal, Table, Text } from '@mantine/core';
import { useState } from 'react';
import uniqid from 'uniqid';
import {
  StarFillIcon,
  StarIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';
import {
  editContactLocalStorage,
  removeContactLocalStorage,
} from '../../Context/actions';
import { useAppDispatch, useAppState } from '../../Context/store';
import NewContactForm from '../NewContactForm';

const ContactsTable = (props) => {
  const { contacts } = useAppState();
  const dispatch = useAppDispatch();

  const { favorite, seteditcontact, seteditcontactopen } = props;
  const handleDeleteItem = (contact) => {
    removeContactLocalStorage(dispatch, contact);
  };
  const handleEditContact = (contact) => {
    seteditcontact(contact);
    seteditcontactopen(true);
  };
  const handleStarContact = (contact) => {
    const toggleStarContact = { ...contact, favorite: !contact.favorite };
    editContactLocalStorage(dispatch, toggleStarContact);
  };
  const rows = contacts
    .filter((contact) => (favorite ? contact.favorite : contact))
    .map((contact, index) => (
      <tr key={`${contact?.id}${uniqid('-item')}`}>
        <td>
          <ActionIcon
            color={contact.favorite ? 'yellow' : 'gray'}
            variant='transparent'
            title='Add to favorites'
            onClick={() => handleStarContact(contact)}
          >
            {contact.favorite ? (
              <StarFillIcon size={18} />
            ) : (
              <StarIcon size={18} />
            )}
          </ActionIcon>
        </td>
        <td>{index + 1}</td>
        <td>{contact?.name}</td>
        <td>{contact?.phone}</td>
        <td>{contact?.email}</td>
        <td>
          <Button
            color='blue'
            compact
            onClick={() => handleEditContact(contact)}
          >
            Edit
          </Button>
        </td>
        <td>
          <ActionIcon
            color='red'
            variant='transparent'
            title='Remove item'
            onClick={() => handleDeleteItem(contact)}
          >
            <XCircleFillIcon />
          </ActionIcon>
        </td>
      </tr>
    ));
  return (
    // <ScrollArea style={{ height: 300 }}>
    <Table verticalSpacing='sm' horizontalSpacing='xs' highlightOnHover>
      <thead>
        <tr>
          <th>{null}</th>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>{null}</th>
          <th>{null}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    // </ScrollArea>
  );
};

const PhonebookTable = (props) => {
  const { favorite } = props;
  const [editContactOpened, setEditContactOpened] = useState(false);
  const [editContact, setEditContact] = useState('hola');

  const { contacts } = useAppState();

  const checkContacts = contacts?.filter((contact) => {
    return favorite ? contact?.favorite : contact;
  });

  return checkContacts?.length ? (
    <>
      <ContactsTable
        seteditcontactopen={setEditContactOpened}
        seteditcontact={setEditContact}
        favorite={favorite}
      />
      <Modal
        opened={editContactOpened}
        onClose={() => setEditContactOpened(false)}
        title='Edit Contact'
        styles={{
          header: { fontWeight: 600 },
        }}
        transition='fade'
        transitionDuration={300}
        transitionTimingFunction='ease'
        centered
      >
        <NewContactForm
          setmodalopen={setEditContactOpened}
          editcontact={editContact}
        />
      </Modal>
    </>
  ) : (
    <Text>There are no contacts to show</Text>
  );
};

export default PhonebookTable;

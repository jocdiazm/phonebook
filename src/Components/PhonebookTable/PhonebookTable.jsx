/* eslint-disable react/prop-types */
import { ActionIcon, Button, Modal, Table, Text } from '@mantine/core';
import uniqid from 'uniqid';
import {
  StarFillIcon,
  StarIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';
import { useState } from 'react';
import ContactForm from '../ContactForm';

const myContacts = [
  {
    name: 'Jose Díaz',
    phone: '3001231234',
    email: 'josek1031@gmail.com',
    favorite: false,
  },
  {
    name: 'Jose Carlos Díaz',
    phone: '12345345354',
    email: 'josekdiaz@gmail.com',
    favorite: true,
  },
  {
    name: 'Jose Díaz 3',
    phone: '30012234324234',
    email: 'josek1031+01@gmail.com',
    favorite: false,
  },
  {
    name: 'Jose Díaz',
    phone: '3001231234',
    email: 'josek1031@gmail.com',
    favorite: false,
  },
  {
    name: 'Jose Carlos Díaz',
    phone: '12345345354',
    email: 'josekdiaz@gmail.com',
    favorite: true,
  },
  {
    name: 'Jose Díaz 3',
    phone: '30012234324234',
    email: 'josek1031+01@gmail.com',
    favorite: false,
  },
];
const ContactsTable = (props) => {
  const { contacts, setcontacts: setContacts } = props;
  const handleDeleteItem = (index) => {
    setContacts((state) => {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    });
  };
  const handleEditContact = (index) => {
    setContacts((state) => {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    });
  };
  const handleStarContact = (index) => {
    setContacts((state) => {
      const newState = state.map((contact, contactIndex) => {
        if (contactIndex === index) {
          const updatedContact = { ...contact, favorite: !contact.favorite };
          return updatedContact;
        }
        return contact;
      });

      return newState;
    });
  };
  const rows = contacts.map((contact, index) => (
    <tr key={`${contact?.id}${uniqid('-item')}`}>
      <td>
        <ActionIcon
          color={contact.favorite ? 'yellow' : 'gray'}
          variant='transparent'
          title='Add to favorites'
          onClick={() => handleStarContact(index)}
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
        <Button color='blue' compact onClick={handleEditContact}>
          Edit
        </Button>
      </td>
      <td>
        <ActionIcon
          color='red'
          variant='transparent'
          title='Remove item'
          onClick={() => handleDeleteItem(index)}
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

const PhonebookTable = () => {
  const [contacts, setContacts] = useState(myContacts);
  const [modalOpened, setModalOpened] = useState(false);
  return contacts?.length ? (
    <>
      <ContactsTable contacts={contacts} setcontacts={setContacts} />
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title='Edit Contact'
        styles={{
          header: { fontWeight: 600 },
        }}
        transition='fade'
        transitionDuration={300}
        transitionTimingFunction='ease'
        centered
      >
        <ContactForm setmodalopen={setModalOpened} />
      </Modal>
    </>
  ) : (
    <Text>There are no contacts to show</Text>
  );
};

export default PhonebookTable;

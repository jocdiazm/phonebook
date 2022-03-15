/* eslint-disable no-unused-vars */
import { Button, Group, Modal, Tabs, Title } from '@mantine/core';
import {
  PersonAddIcon,
  PersonFillIcon,
  StarFillIcon,
} from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import './App.css';
import NewContactForm from './Components/NewContactForm';
import PhonebookTable from './Components/PhonebookTable';
import { getContactsFromLocalStorage } from './Context/actions';
import { useAppDispatch, useAppState } from './Context/store';

const myContacts = [
  {
    name: 'Carlos Muñoz',
    phone: '3001231235',
    email: 'josek1031@gmail.com',
    favorite: false,
  },
  {
    name: 'Jose Díaz',
    phone: '12345345358',
    email: 'josekdiaz@gmail.com',
    favorite: false,
  },
  {
    name: 'Juan Diaz',
    phone: '30012234324239',
    email: 'juandiaz@gmail.com',
    favorite: true,
  },
  {
    name: 'Emmanuele',
    phone: '3001231234',
    email: 'emmanuele@gmail.com',
    favorite: false,
  },
  {
    name: 'Maria Muñoz',
    phone: '12345345354',
    email: 'mariamunoz@gmail.com',
    favorite: true,
  },
  {
    name: 'Davis',
    phone: '30012234324234',
    email: 'davis@gmail.com',
    favorite: true,
  },
];

const App = () => {
  const [newContactOpened, setNewContactOpened] = useState(false);
  const { contacts } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getContactsFromLocalStorage(dispatch);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleImportContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(myContacts));
    getContactsFromLocalStorage(dispatch);
  };

  return (
    <div className='App'>
      <div className='Phonebook-container'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Title order={1}> Contact List</Title>
        </div>

        <Group position='apart' style={{ margin: 30 }}>
          <Button
            color='violet'
            leftIcon={<PersonAddIcon size={14} />}
            onClick={handleImportContacts}
            compact
          >
            Import contacts
          </Button>
          <Button
            color='teal'
            leftIcon={<PersonAddIcon size={14} />}
            compact
            onClick={() => setNewContactOpened(true)}
          >
            Add new contact
          </Button>
        </Group>

        <Modal
          opened={newContactOpened}
          onClose={() => setNewContactOpened(false)}
          title='New Contact'
          styles={{
            header: { fontWeight: 600 },
          }}
          transition='fade'
          transitionDuration={300}
          transitionTimingFunction='ease'
          centered
        >
          <NewContactForm setmodalopen={setNewContactOpened} />
        </Modal>

        <Tabs>
          <Tabs.Tab label='Contacts' icon={<PersonFillIcon size={14} />}>
            <PhonebookTable contacts={contacts} />
          </Tabs.Tab>
          <Tabs.Tab label='Favorites' icon={<StarFillIcon size={14} />}>
            <PhonebookTable contacts={contacts} favorite />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default App;

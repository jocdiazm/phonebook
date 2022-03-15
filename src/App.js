import { Button, Modal, Tabs, Title } from '@mantine/core';
import {
  PersonAddIcon,
  PersonFillIcon,
  StarFillIcon,
} from '@primer/octicons-react';
import { useState } from 'react';
import './App.css';
import NewContactForm from './Components/NewContactForm';
import PhonebookTable from './Components/PhonebookTable';

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

const App = () => {
  const [newContactOpened, setNewContactOpened] = useState(false);
  const [editContactOpened, setEditContactOpened] = useState(false);
  const [contacts, setContacts] = useState(myContacts);
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
          <Button
            color='teal'
            leftIcon={<PersonAddIcon size={14} />}
            compact
            onClick={() => setNewContactOpened(true)}
          >
            Add contact
          </Button>
        </div>

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
          <NewContactForm setmodalopen={setEditContactOpened} />
        </Modal>

        <Tabs>
          <Tabs.Tab label='Contacts' icon={<PersonFillIcon size={14} />}>
            <PhonebookTable
              contacts={contacts}
              setContacts={setContacts}
              seteditcontact={setEditContactOpened}
            />
          </Tabs.Tab>
          <Tabs.Tab label='Favorites' icon={<StarFillIcon size={14} />}>
            <PhonebookTable
              contacts={contacts}
              setContacts={setContacts}
              seteditcontact={setEditContactOpened}
              favorite
            />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default App;

import { Button, Title } from '@mantine/core';
import { PersonAddIcon } from '@primer/octicons-react';
import './App.css';
import PhonebookTable from './Components/PhonebookTable';

const App = () => {
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
          <Button color='teal' leftIcon={<PersonAddIcon size={14} />} compact>
            Add contact
          </Button>
        </div>

        <PhonebookTable />
      </div>
    </div>
  );
};

export default App;

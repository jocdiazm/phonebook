const contacts = [
  {
    name: 'Jose Díaz',
    phone: '3001231234',
    email: 'josek1031@gmail.com',
  },
  {
    name: 'Jose Carlos Díaz',
    phone: '12345345354',
    email: 'josekdiaz@gmail.com',
  },
];
const PhonebookTable = () => {
  return (
    <ul>
      {contacts.map((contact) => {
        return <li>{contact.name}</li>;
      })}
    </ul>
  );
};

export default PhonebookTable;

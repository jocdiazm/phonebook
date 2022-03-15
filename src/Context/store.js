import { createContext, useContext, useReducer } from 'react';
import {
  GET_CONTACTS,
  CONTACT_EDIT,
  CONTACT_REMOVE,
  CONTACT_ADD,
} from './constants';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  contacts: [],
};
function AppReducer(state, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case CONTACT_EDIT: {
      const editedContact = action.payload;
      const newContacts = state.contacts.map((contact) => {
        if (contact?.phone === editedContact.phone) {
          return editedContact;
        }
        return contact;
      });
      return {
        ...state,
        contacts: newContacts,
      };
    }
    case CONTACT_REMOVE: {
      const deletedContact = action.payload;
      const newContacts = state.contacts.filter((contact) => {
        return contact.phone !== deletedContact.phone;
      });
      return {
        ...state,
        contacts: newContacts,
      };
    }
    case CONTACT_ADD: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
};

// eslint-disable-next-line object-curly-newline
export { AppProvider, useAppState, useAppDispatch };

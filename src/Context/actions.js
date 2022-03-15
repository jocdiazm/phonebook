import {
  GET_CONTACTS,
  CONTACT_ADD,
  CONTACT_EDIT,
  CONTACT_REMOVE,
} from './constants';

import { getContactsLocal } from './services';

export const getContactsFromLocalStorage = (dispatch) => {
  const contactsLocal = getContactsLocal();
  dispatch({ type: GET_CONTACTS, payload: contactsLocal });
};

export const addContactToLocalStorage = (dispatch, contact) => {
  dispatch({ type: CONTACT_ADD, payload: contact });
};

export const editContactLocalStorage = (dispatch, contact) => {
  dispatch({ type: CONTACT_EDIT, payload: contact });
};

export const removeContactLocalStorage = (dispatch, contact) => {
  dispatch({ type: CONTACT_REMOVE, payload: contact });
};

export const getCurrentLocalStorage = (item) => {
  try {
    const localItem = JSON.parse(localStorage.getItem(`${item}`)) ?? [];
    return localItem;
  } catch {
    return null;
  }
};

export const getContactsLocal = () => {
  try {
    const contactsLocal = getCurrentLocalStorage('contacts');
    return contactsLocal;
  } catch (error) {
    throw Error(error);
  }
};

export const setContactsLocal = (contacts) => {
  try {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    throw Error(error);
  }
};

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { FormContact } from 'components/FormContact/FormContact';
import { Header } from 'components/Header/Header';
import {
  addContactThunk,
  deleteContactThunk,
  requestContactsThunk,
  selectUserContacts,
} from 'redux/contactsReducer';
import { ListContacts } from 'components/ListContacts/ListContacts';
import { selectAuthentificated} from 'redux/authReducer';
import Footer from 'components/Footer/Footer';


const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectUserContacts);
  const authentificated = useSelector(selectAuthentificated);

  useEffect(() => {
    if (!authentificated) return;

    dispatch(requestContactsThunk());
  }, [
    authentificated, 
    dispatch]);

  const onSubmit = data => {
    if (contacts.some(contact => contact.name === data.name))
      return alert(`Contact with name ${data.name} already exists!`);
    dispatch(addContactThunk(data));
  };

  const deleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <FormContact onSubmit={onSubmit} />
        <ListContacts contacts={contacts} deleteContact={deleteContact} />
      </div>

      <Footer />
    </div>
  );
};

export default ContactsPage;

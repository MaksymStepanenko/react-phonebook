import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectToken, selectAuthentificated } from 'redux/authReducer';
import { refreshUserThunk } from 'redux/operation';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import ContactsPage from 'pages/ContactsPage';
import WelcomePage from 'pages/WelcomePage';
import LoginPage from 'pages/LoginPage';
import RegistrationPage from 'pages/RegistrationPage';

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selectAuthentificated);

  useEffect(() => {
    if (!token || authentificated) return;

    dispatch(refreshUserThunk());
  }, [token, dispatch, authentificated]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/contacts"
        element={
          <PrivateRoute redirectTo="/">
            <ContactsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

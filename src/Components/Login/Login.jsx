// LoginPage.jsx
import React from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // يرجع المستخدم للصفحة اللي كان فيها
  };

  return <LoginModal onClose={handleClose} />;
}
// src/features/reset_password/pages/ResetPasswordPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import ResetPasswordComponent from 'features/reset_password/components/ResetPasswordComponent'; 

const ResetPasswordPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token'); 

  return <ResetPasswordComponent token={token} />;
};

export default ResetPasswordPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResetPasswordComponent from 'features/ResetPassword/components/ResetPasswordComponent'; 

const ResetPasswordPage = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenParam = query.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  if (!token) {
    return <div>Invalid or missing token</div>; 
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <ResetPasswordComponent token={token} />
    </div>
  );
};

export default ResetPasswordPage;

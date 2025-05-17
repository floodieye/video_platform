import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика входа
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Поля формы */}
      </form>
    </div>
  );
};

export default Login;
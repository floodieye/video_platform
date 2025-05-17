import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика регистрации
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Поля формы */}
      </form>
    </div>
  );
};

export default Register;
import { useState } from 'react';

export const LoginLogic = () => {
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(null);

  const validateLogin = (value) => {
    if (!value) return 'Логин не может быть пустым';
    if (!/^[\w_]*$/.test(value)) {
      return 'Неверный логин. Допустимые символы - буквы, цифры и нижнее подчёркивание';
    }
    if (value.length < 5) {
      return 'Неверный логин. Должно быть не меньше 5 символов';
    }
    if (value.length > 20) {
      return 'Неверный логин. Должно быть не больше 20 символов';
    }
    return null;
  };

  const onLoginChange = ({ target }) => {
    const value = target.value;
    setLogin(value);
    setLoginError(validateLogin(value));
  };

  const onBlur = () => {
    setLoginError(validateLogin(login));
  };

  const isLoginValid = loginError === null && login.length >= 5;

  return {
    login,
    loginError,
    onLoginChange,
    onBlur,
    setLogin,
    isLoginValid,
  };
};

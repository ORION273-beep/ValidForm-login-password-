import { useState } from 'react';

export const PasswordLogic = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const validatePassword = (value) => {
    if (!value) return 'Пароль не может быть пустым';
    if (!/^[\w_]*$/.test(value)) {
      return 'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчёркивание';
    }
    if (value.length < 8) {
      return 'Пароль должен быть не меньше 8 символов';
    }
    if (value.length > 20) {
      return 'Пароль должен быть не больше 20 символов';
    }
    return null;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return 'Подтвердите пароль';
    if (value !== password) {
      return 'Пароли не совпадают';
    }
    return null;
  };

  const onPasswordChange = ({ target }) => {
    const value = target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };

  const onConfirmPasswordChange = ({ target }) => {
    const value = target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value));
  };

  const onPasswordBlur = () => {
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };

  const onConfirmPasswordBlur = () => {
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };
  const isPasswordValid =
    passwordError === null &&
    confirmPasswordError === null &&
    password.length >= 8 &&
    confirmPassword === password;

  return {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    onPasswordChange,
    onConfirmPasswordChange,
    onPasswordBlur,
    onConfirmPasswordBlur,
    setPassword,
    setConfirmPassword,
    isPasswordValid,
  };
};

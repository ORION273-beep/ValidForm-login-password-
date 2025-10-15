import { PasswordLogic } from './password';
import { LoginLogic } from './login';
import styles from './app.module.css';

export const App = () => {
  const loginProps = LoginLogic();
  const passwordProps = PasswordLogic();
  const isFormValid = loginProps.isLoginValid && passwordProps.isPasswordValid;
  const isDisabled = !isFormValid;

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('✅ Регистрация:', {
        login: loginProps.login,
        password: passwordProps.password,
        confirmPassword: passwordProps.confirmPassword
      });
    }
  };

  const resetForm = () => {
    loginProps.setLogin('');
    passwordProps.setPassword('');
    passwordProps.setConfirmPassword('');
  };

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <input
            id="login"
            name="login"
            type="text"
            value={loginProps.login}
            placeholder=" "
            onChange={loginProps.onLoginChange}
            onBlur={loginProps.onBlur}
            className={loginProps.loginError ? styles.inputError : styles.input}
          />
          <label htmlFor="login">Логин</label>
        </div>
        {loginProps.loginError && (
          <div className={styles.errorLabel}>{loginProps.loginError}</div>
        )}
        <div className={styles.inputContainer}>
          <input
            id="password"
            name="password"
            type="password"
            value={passwordProps.password}
            placeholder=" "
            onChange={passwordProps.onPasswordChange}
            onBlur={passwordProps.onPasswordBlur}
            className={passwordProps.passwordError ? styles.inputError : styles.input}
          />
          <label htmlFor="password">Пароль</label>
        </div>
        {passwordProps.passwordError && (
          <div className={styles.errorLabel}>{passwordProps.passwordError}</div>
        )}
        <div className={styles.inputContainer}>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={passwordProps.confirmPassword}
            placeholder=" "
            onChange={passwordProps.onConfirmPasswordChange}
            onBlur={passwordProps.onConfirmPasswordBlur}
            className={passwordProps.confirmPasswordError ? styles.inputError : styles.input}
          />
          <label htmlFor="confirmPassword">Повторите пароль</label>
        </div>
        {passwordProps.confirmPasswordError && (
          <div className={styles.errorLabel}>{passwordProps.confirmPasswordError}</div>
        )}
        <button
          className={styles.regbtn}
          type="submit"
          disabled={isDisabled}
        >
          Зарегистрироваться
        </button>
        <button className={styles.regbtn}
		type="button"
		onClick={resetForm}
		style={{ marginTop: '0.5rem'}}>
          Сбросить
        </button>
      </form>
    </div>
  );
};

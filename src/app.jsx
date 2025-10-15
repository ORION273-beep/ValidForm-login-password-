import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './app.module.css';

const schema = yup.object().shape({
  login: yup
    .string()
    .required('Логин не может быть пустым')
    .matches(/^[\w_]*$/, 'Неверный логин. Допустимые символы - буквы, цифры и нижнее подчёркивание')
    .min(5, 'Неверный логин. Должно быть не меньше 5 символов')
    .max(20, 'Неверный логин. Должно быть не больше 20 символов'),
  password: yup
    .string()
    .required('Пароль не может быть пустым')
    .matches(/^[\w_]*$/, 'Допустимые символы - буквы, цифры и нижнее подчёркивание')
    .min(8, 'Пароль должен быть не меньше 8 символов')
    .max(20, 'Пароль должен быть не больше 20 символов'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
}, ['password', 'confirmPassword']);

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = (data) => {
    console.log('✅ Регистрация:', data);
    reset();
  };

  const onReset = () => {
    reset();
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input
            id="login"
            type="text"
            placeholder=" "
            className={errors.login ? styles.inputError : styles.input}
            {...register('login')}
          />
          <label htmlFor="login">Логин</label>
        </div>
        {errors.login && <div className={styles.errorLabel}>{errors.login.message}</div>}
        <div className={styles.inputContainer}>
          <input
            id="password"
            type="password"
            placeholder=" "
            className={errors.password ? styles.inputError : styles.input}
            {...register('password')}
          />
          <label htmlFor="password">Пароль</label>
        </div>
        {errors.password && <div className={styles.errorLabel}>{errors.password.message}</div>}
        <div className={styles.inputContainer}>
          <input
            id="confirmPassword"
            type="password"
            placeholder=" "
            className={errors.confirmPassword ? styles.inputError : styles.input}
            {...register('confirmPassword')}
          />
          <label htmlFor="confirmPassword">Повторите пароль</label>
        </div>
        {errors.confirmPassword && (
          <div className={styles.errorLabel}>{errors.confirmPassword.message}</div>
        )}
        <div className={styles.buttonGroup}>
          <button
            className={styles.regbtn}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <button
            type="button"
            className={styles.regbtn}
            onClick={onReset}
			style={{ marginTop: '0.5rem'}}
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
};

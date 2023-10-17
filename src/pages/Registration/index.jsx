import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit'
  })

  const selectOptions = {
    fullName: {
      required: true,
      minLength: { value: 2, message: 'Full Name should be at least 2 symbols.' },
      maxLength: { value: 20, message: 'Full Name should have maximum 20 symbols.' }
    },
    email: {
      required: true,
    },
    password: {
      required: true,
      minLength: { value: 4, message: 'Password should be at least 4 symbols.' }
    }
  }

  const handleRegistration = async (values) => {
    console.log(values);
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if('token' in data.payload){
      localStorage.setItem('token', JSON.stringify(data.payload.token));
      navigate('/');    
    }
    else{
      alert('Не удалось зарегистрироваться!')
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form method='post' onSubmit={handleSubmit(handleRegistration)}>
        <TextField 
          type='text' 
          className={styles.field} 
          label="Полное имя" fullWidth 
          {...register('fullName', selectOptions.fullName)} 
          error={errors.fullName?.message && true} 
          helperText={errors?.fullName && errors.fullName.message}
          />
        <TextField
          type='email' 
          className={styles.field} 
          label="E-Mail" fullWidth 
          {...register('email', selectOptions.email)} 
          error={errors.email?.message && true} 
          helperText={errors?.email && errors.email.message}
          />
        <TextField
          type='password'
          className={styles.field}
          label="Пароль" fullWidth
          {...register('password', selectOptions.password)}
          error={errors.password?.message && true}
          helperText={errors?.password && errors.password.message}
        />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

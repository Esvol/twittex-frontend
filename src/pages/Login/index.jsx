import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const registerOptions = {
    email: { required: "Email is required!" },
    password: {
      required: "Password is required!",
      minLength: {
        value: 4,
        message: "Password must have at least 4 characters"
      }
    }
  }

  const handleLogin = async (values) => {
    const data = await dispatch(fetchUserData(values));
    console.log(data);
    
    if('token' in data.payload){
      localStorage.setItem('token', JSON.stringify(data.payload.token));     
    }
    else{
      alert('Не удалось авторизоваться! (No token)')
    }
  }

  if(isAuth){
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form method="post" onSubmit={handleSubmit(handleLogin)}>
        <TextField
          type="email"
          className={styles.field}
          name="email"
          label="E-Mail"
          helperText={errors?.email && errors.email.message}
          error={errors?.email && true}
          fullWidth
          {...register('email', registerOptions.email)}
        />
        <TextField 
          type="password"
          className={styles.field} 
          label="Пароль" 
          name="password" 
          error={errors?.password && true}
          fullWidth 
          {...register('password', registerOptions.password)} 
          helperText={errors?.password && errors.password.message} 
          />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './signin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../authSlice';
import { url } from '../const';

export const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  
  const onSignIn = (data) => {
    axios
      .post(`${url}/signin`, { email: data.email, password: data.password })
      .then((res) => {
        setCookie('token', res.data.token);
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            {...register('email')}
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            {...register('password')}
          />
          <br />
          <button type="button" className="signin-button" onClick={handleSubmit(onSignIn)}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};

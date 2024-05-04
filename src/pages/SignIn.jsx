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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit', criteriaMode: 'all' });
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
    <div className="whole">
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSignIn)} className="signin-form">
          <label htmlFor="email" className="email-label">
            メールアドレス
          </label>
          <br />
          <input
            id="email"
            type="email"
            className="email-input"
            {...register('email', { required: '入力が必須の項目です。' })}
          />
          {errors.email?.message && (
            <div className="error-message">{errors.email?.message}</div>
          )}
          <br />
          <label htmlFor="password" className="password-label">
            パスワード
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="password-input"
            {...register('password', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'アルファベットのみ入力可能です。',
              },
            })}
          />
          {errors.password?.types?.required && (
            <div className="error-message">
              {errors.password.types.required}
            </div>
          )}
          {errors.password?.types?.pattern && (
            <div className="error-message">{errors.password.types.pattern}</div>
          )}
          <br />
          <button type="submit" className="signin-button">
            ログイン
          </button>
        </form>
        <Link to="/signup" className="link">
          ユーザー登録
        </Link>
      </main>
    </div>
  );
};

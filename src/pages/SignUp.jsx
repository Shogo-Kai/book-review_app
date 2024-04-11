import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signIn } from '../authSlice';
import { Header } from '../components/Header';
import { url } from '../const';
import './signUp.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();

  const onSignUp = (data) => {
    const userInfo = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    axios
      .post(`${url}/users`, userInfo)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie('token', token);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" />;
  };
  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label>メールアドレス</label>
          <br />
          <input type="email" className="email-input" {...register('email')} />
          <br />
          <label>ユーザ名</label>
          <br />
          <input type="name" className="name-input" {...register('name')} />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            {...register('password')}
          />
          <br />
          <button
            type="button"
            onClick={handleSubmit(onSignUp)}
            className="signup-button"
          >
            作成
          </button>
        </form>
        <Link to="/signin">ログイン画面へ</Link>
      </main>
    </div>
  );
};

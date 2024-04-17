import axios from 'axios';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit', criteriaMode: 'all' });
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [formData, setFormData] = useState(new FormData());

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFormData = new FormData();
    new Compressor(file, {
      quality: 0.6,
      success(compressedFile) {
        newFormData.append('icon', compressedFile);
        setFormData(newFormData);
      },
    });
  };

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
        setCookie('token', token);
        dispatch(signIn());
        return axios.post(`${url}/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${cookies.token}`,
          },
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" />;
  };
  return (
    <div className="all">
      <Header />
      <main className="signup">
        <h2>ユーザー登録</h2>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSignUp)} className="signup-form">
          <label>ユーザ名</label>
          <br />
          <input
            type="name"
            className="name-input"
            {...register('name', { required: '入力が必須の項目です。' })}
          />
          {errors.name?.message && (
            <div className="error-message">{errors.name.message}</div>
          )}
          <br />
          <label>ユーザアイコン</label>
          <br />
          <input
            type="file"
            accept=".jpg, .png"
            className="file-input"
            {...register('file', { required: 'ファイルを選択してください。' })}
            onChange={handleFileChange}
          />
          {errors.file?.message && (
            <div className="error-message">{errors.file.message}</div>
          )}
          <br />
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            {...register('email', { required: '入力が必須の項目です。' })}
          />
          {errors.email?.message && (
            <div className="error-message">{errors.email.message}</div>
          )}
          <br />
          <label>パスワード</label>
          <br />
          <input
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
          <button type="submit" className="signup-button">
            登録
          </button>
        </form>
        <Link to="/signin" className="link">
          ログイン画面へ
        </Link>
      </main>
    </div>
  );
};

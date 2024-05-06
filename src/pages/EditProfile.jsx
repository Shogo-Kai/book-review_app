import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { url } from '../const';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './editprofile.scss';

export const EditProfile = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit', criteriaMode: 'all' });

  const editProfile = (data) => {
    const userInfo = {
      name: data.name,
    };
    axios
      .put(`${url}/users`, userInfo, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`ユーザー名の更新に失敗しました。 ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setValue('name', res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー名の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div className="whole">
      <Header />
      <div className="profile">
        <div className="profile-header">
          <h2 className="profile-header__title">変更</h2>
        </div>
        <p className="profile__error-message">{errorMessage}</p>

        <form onSubmit={handleSubmit(editProfile)} className="profile-edit">
          <label htmlFor='name'>ユーザ名</label>
          <br />
          <input
            id='name'
            type="name"
            className="profile-edit__name"
            {...register('name', { required: '入力が必須の項目です。' })}
          />
          {errors.name?.message && (
            <div className="profile-edit__error-message">
              {errors.name.message}
            </div>
          )}
          <br />
          <button type="submit" className="profile-edit__button">
            変更
          </button>
        </form>
        <div className="profile-edit-footer">
          <Link className="profile-edit-footer__transition" to="/">
            書籍一覧
          </Link>
        </div>
      </div>
    </div>
  );
};

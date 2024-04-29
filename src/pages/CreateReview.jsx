import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import './createreview.scss';

export const CreateReview = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit', criteriaMode: 'all' });
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();

  const entry = (data) => {
    const bookInfo = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };

    axios
      .post(`${url}/books`, bookInfo, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`登録に失敗しました。 ${err}`);
      });
  };

  return (
    <div className="whole">
      <Header />
      <div className="create-review">
        <h2 className="create-review__heading">書籍レビューの登録</h2>
        <p className="create-review__error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(entry)} className="creat-form">
          <label className="creat-form__label" htmlFor="title">
            タイトル
          </label>
          <br />
          <input
            type="title"
            id="title"
            className="creat-form__title"
            {...register('title', { required: '入力が必須の項目です。' })}
          />
          {errors.title?.message && (
            <div className="error-message">{errors.title?.message}</div>
          )}
          <br />
          <label className="creat-form__label" htmlFor="detail">
            詳細
          </label>
          <br />
          <input
            type="detail"
            id="detail"
            className="creat-form__detail"
            {...register('detail', { required: '入力が必須の項目です。' })}
          />
          {errors.detail?.message && (
            <div className="error-message">{errors.detail?.message}</div>
          )}
          <br />
          <label className="creat-form__label" htmlFor="url">
            URL
          </label>
          <br />
          <input
            type="url"
            id="url"
            className="creat-form__url"
            {...register('url', { required: '入力が必須の項目です。' })}
          />
          {errors.url?.message && (
            <div className="error-message">{errors.url?.message}</div>
          )}
          <br />
          <label className="creat-form__label" htmlFor="review">
            レビュー
          </label>
          <br />
          <input
            type="review"
            id="review"
            className="creat-form__review"
            {...register('review', { required: '入力が必須の項目です。' })}
          />
          {errors.review?.message && (
            <div className="error-message">{errors.review?.message}</div>
          )}
          <br />
          <button type="submit" className="creat-form__submit">
            登録
          </button>
        </form>
        <Link to="/" className="review-link">
          書籍一覧
        </Link>
      </div>
    </div>
  );
};

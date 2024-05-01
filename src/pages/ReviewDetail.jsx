import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Header } from '../components/Header';
import { url } from '../const';
import './reviewdetail.scss';

export const ReviewDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [cookies] = useCookies();
  const headers = { authorization: `Bearer ${cookies.token}` };
  const [errorMessage, setErrorMessage] = useState();
  const [reviewer, setReviewer] = useState('A');
  const [name, setName] = useState('B');
  const valuesMatch = reviewer === name;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit', criteriaMode: 'all' });

  const updateFields = (data) => {
    setValue('title', data.title);
    setValue('url', data.url);
    setValue('detail', data.detail);
    setValue('review', data.review);
  };

  const erase = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`書籍の削除に失敗しました。${err}`);
      });
  };

  const edit = (data) => {
    const bookInfo = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };
    axios
      .put(`${url}/books/${id}`, bookInfo, { headers })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`書籍情報の更新に失敗しました。 ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, { headers })
      .then((res) => {
        setReviewer(res.data.reviewer);
        updateFields(res.data);
        setIsLoading(false);
        return axios.get(`${url}/users`, { headers }).then((res) => {
          setName(res.data.name);
        });
      })
      .catch((err) => {
        setErrorMessage(`書籍情報、ユーザ名の取得に失敗しました。 ${err}`);
      });
  }, []);

  return (
    <div className="whole">
      <Header />
      {isLoading ? (
        <Audio
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      ) : (
        <div className="review-detail">
          <h2 className="review-detail__heading">レビュー詳細</h2>
          <p className="review-detail__error-message">{errorMessage}</p>
          <form onSubmit={handleSubmit(edit)} className="review-form">
            <label className="review-form__label" htmlFor="title">
              タイトル
            </label>
            <br />
            <input
              type="title"
              id="title"
              className="review-form__title"
              {...register('title', { required: '入力が必須の項目です。' })}
            />
            {errors.title?.message && (
              <div className="error-message">{errors.title?.message}</div>
            )}
            <br />
            <label className="review-form__label" htmlFor="url">
              URL
            </label>
            <br />
            <input
              type="url"
              id="url"
              className="review-form__url"
              {...register('url', { required: '入力が必須の項目です。' })}
            />
            {errors.url?.message && (
              <div className="error-message">{errors.url?.message}</div>
            )}

            <br />
            <label className="review-form__label" htmlFor="detail">
              詳細
            </label>
            <br />
            <textarea
              type="detail"
              id="detail"
              className="review-form__detail"
              {...register('detail', { required: '入力が必須の項目です。' })}
            />
            {errors.detail?.message && (
              <div className="error-message">{errors.detail?.message}</div>
            )}

            <br />
            <label className="review-form__label" htmlFor="review">
              レビュー
            </label>
            <br />
            <textarea
              type="review"
              id="review"
              className="review-form__review"
              {...register('review', { required: '入力が必須の項目です。' })}
            />
            {errors.review?.message && (
              <div className="error-message">{errors.review?.message}</div>
            )}
            <br />

            {valuesMatch && (
              <>
                <button type="submit" className="review-form__submit">
                  編集
                </button>
                <button
                  type="button"
                  className="review-form__button"
                  onClick={erase}
                >
                  削除
                </button>
              </>
            )}
          </form>
          <Link to="/" className="review-link">
            書籍一覧
          </Link>
        </div>
      )}
    </div>
  );
};

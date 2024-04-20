import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import './review.scss';

export const Review = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    axios
      .get(`${url}/books?offset=0`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        setErrorMessage(`書籍一覧の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div className="whole">
      <Header />
      <div className="books">
        <p className="error-message">{errorMessage}</p>
        <div className="books-header">
          <h2 className="books-header__title">書籍一覧</h2>
        </div>
        <ul className="books-list">
          {books.map((key) => {
            return (
              <li key={key} className="books-list__information" tabIndex="0">
                {books.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

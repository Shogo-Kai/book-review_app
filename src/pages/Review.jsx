import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
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
        <p className="books__error-message">{errorMessage}</p>
        <div className="books-header">
          <h2 className="books-header__title">書籍一覧</h2>
        </div>
        <ul className="books-list">
          {books.map((book) => {
            return (
              <li key={book.id} className="books-list__info" tabIndex="0">
                {book.title}
              </li>
            );
          })}
        </ul>
        <div className="books-footer">
          <Link className="books-footer__transition" to="/review/create">
            書籍レビュー登録
          </Link>
        </div>
      </div>
    </div>
  );
};

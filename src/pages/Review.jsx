import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { url } from '../const';
import './review.scss';

export const Review = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();
  const [bookOffset, setBookOffset] = useState(0);

  const handlePaginate = (selectedPage) => {
    const newOffset = selectedPage.selected * 10;
    setBookOffset(newOffset);
  };

  useEffect(() => {
    axios
      .get(`${url}/books?offset=${bookOffset}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setErrorMessage(null); 
      })
      .catch((err) => {
        setErrorMessage(`書籍一覧の取得に失敗しました。${err}`);
      });
  }, [bookOffset, cookies.token]);

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
        <div className='books-footer'>
        <Pagination
        onPageChange={handlePaginate} />
        </div>
      </div>
    </div>
  );
};

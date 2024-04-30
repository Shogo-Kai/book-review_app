import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { url } from '../const';
import './review.scss';

export const Review = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();
  const [bookOffset, setBookOffset] = useState(0);

  const sendLog = (bookId) => {
    const bookInfo = {
      selectBookId: bookId,
    };
    console.log(bookId);
    axios
      .post(`${url}/logs`, bookInfo, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        console.log(`ログの送信に成功しました。`);
      })
      .catch((err) => {
        console.log(`ログの送信に失敗しました。 ${err}`);
      });
  };

  const handlePaginate = (selectedPage) => {
    const newOffset = selectedPage.selected * 10;
    setBookOffset(newOffset);
  };

  useEffect(() => {
    const fetchData = () => {
      const endpoint = auth ? 'books' : 'public/books';
      const headers = auth ? { authorization: `Bearer ${cookies.token}` } : {};

      axios
        .get(`${url}/${endpoint}?offset=${bookOffset}`, { headers })
        .then((res) => {
          setBooks(res.data);
          setErrorMessage(null);
        })
        .catch((err) => {
          setErrorMessage(`書籍一覧の取得に失敗しました ${err}`);
        });
    };

    fetchData();
  }, [auth, url, bookOffset, cookies.token]);

  return (
    <div className="whole">
      <Header />
      <div className="books">
        <div className="books-header">
          <h2 className="books-header__title">書籍一覧</h2>
        </div>
        <p className="books__error-message">{errorMessage}</p>
        <ul className="books-list">
          {books.map((book) => {
            return (
              <li key={book.id} className="books-list__info" tabIndex="0">
                <Link
                  className="transition"
                  to={`/detail/${book.id}`}
                  onClick={() => sendLog(book.id)}
                >
                  {book.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="books-footer">
          {auth && (
            <Link className="books-footer__transition" to="/review/create">
              書籍レビュー登録
            </Link>
          )}
          <Pagination onPageChange={handlePaginate} />
        </div>
      </div>
    </div>
  );
};

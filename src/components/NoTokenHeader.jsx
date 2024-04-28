import React from 'react';
import { Link } from 'react-router-dom';
import './notokenheader.scss';

export const NoTokenHeader = () => {
  return (
    <header className="header">
      <h1 className="header__title">書籍レビューアプリ</h1>
      <div className="header-contents">
        <div className="header-content">
          <Link to="/signin" className="header-content__link">
            サインアウト
          </Link>
        </div>
      </div>
    </header>
  );
};

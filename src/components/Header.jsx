import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from '../authSlice';
import { UserInfo } from '../pages/UserInfo';
import './header.scss';

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <header className="header">
      <h1 className="header__title">書籍レビューアプリ</h1>
      {auth ? (
        <div className="header-contents">
          <UserInfo />
          <div className="header-content">
            <Link to="/profile" className="header-content__link-edit">
              ユーザー名変更
            </Link>
          </div>
          <div className="header-content">
            <button onClick={handleSignOut} className="header-content__button">
              サインアウト
            </button>
          </div>
        </div>
      ) : (
        <div className="header-contents">
          <div className="header-content">
            <Link to="/" className="header-content__link-review">
              書籍一覧
            </Link>
          </div>
          <div className="header-content">
            <Link to="/signin" className="header-content__link-signin">
              ログイン
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

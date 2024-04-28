import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from '../authSlice';
import { UserInfo } from '../pages/UserInfo';
import './modifyheader.scss';

export const ModifyHeader = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <header className="header">
      <h1 className="header__title">書籍レビューアプリ</h1>
      <div className="header-contents">
        <UserInfo />
        <div className="header-content">
          <button onClick={handleSignOut} className="header-content__button">
            サインアウト
          </button>
        </div>
      </div>
    </header>
  );
};

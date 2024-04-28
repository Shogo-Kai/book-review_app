import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import './userinfo.scss';

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
      });
  }, []);
  return (
    <div className="header-content">
      <div className="header-content__user-info">ユーザー:{userInfo}</div>
      <p className="userinfo__error-message">{errorMessage}</p>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { url } from '../const';
import { useNavigate, Link } from 'react-router-dom';
import { ModifyHeader } from '../components/ModifyHeader';
import './editprofile.scss';

export const EditProfile = () => {
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleNameChange = (e) => setUserName(e.target.value);

  const editProfile = () => {
    const userInfo = {
      name: userName,
    };
    axios
      .put(`${url}/users`, userInfo, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`ユーザー名の更新に失敗しました。 ${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー名の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div className="whole">
      <ModifyHeader />
      <div className="profile">
        <div className="profile-header">
          <h2 className="profile-header__title">変更</h2>
        </div>
        <p className="profile__error-message">{errorMessage}</p>

        <form className="profile-edit">
          <label>ユーザ名</label>
          <br />
          <input
            type="name"
            className="profile-edit__name"
            onChange={handleNameChange}
            value={userName}
          />
          <br />
          <button
            type="button"
            className="profile-edit__button"
            onClick={editProfile}
          >
            編集
          </button>
        </form>

        <div className="profile-edit-footer">
          <Link className="profile-edit-footer__transition" to="/">
            書籍一覧
          </Link>
        </div>
      </div>
    </div>
  );
};

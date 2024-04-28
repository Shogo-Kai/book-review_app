import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { url } from '../const';
import { useNavigate }

export const EditProfile = () => {
    const [userName, setUserName] = useState();

return (
    <div className="whole">
      <Header />
      <div className="books">
        <p className="books__error-message">{errorMessage}</p>
        <div className="books-header">
          <h2 className="books-header__title">ユーザー名変更</h2>
        </div>
        <div className="books-footer">
          <Link className="books-footer__transition" to="/review/create">
            書籍レビュー登録
          </Link>
          <Pagination onPageChange={handlePaginate} />
        </div>
      </div>
    </div>
    )
}
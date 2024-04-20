import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Review } from '../pages/Review';
import { NewBook } from '../pages/NewBook';
import { NotFound } from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route path="/" element={<Review />} />
            <Route path="/book/new" element={<NewBook />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

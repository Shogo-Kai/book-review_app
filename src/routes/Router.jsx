import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Review } from '../pages/Review';
import { CreateReview } from '../pages/CreateReview';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { NoTokenReview } from '../pages/NoTokenReview';
import { EditProfile } from '../pages/EditProfile';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notoken" element={<NoTokenReview />} />
        {auth ? (
          <>
            <Route path="/" element={<Review />} />
            <Route path="/review/create" element={<CreateReview />} />
            <Route path="/profile" element={<EditProfile />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

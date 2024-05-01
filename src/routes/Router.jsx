import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Review } from '../pages/Review';
import { CreateReview } from '../pages/CreateReview';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { EditProfile } from '../pages/EditProfile';
import { ReviewDetail } from '../pages/ReviewDetail';

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Review />} />

        {auth ? (
          <>
            <Route path="/review/create" element={<CreateReview />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/detail/:id" element={<ReviewDetail />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

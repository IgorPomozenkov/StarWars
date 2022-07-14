import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/HomePage/Home'));
const Planet = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/PlanetPage/Planet'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/NotFoundPage/NotFound'));

const Router: React.FC = () => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          color="primary"
          sx={{
            position: 'absolute',
            top: '40%',
            left: '49%',
            color: '#f6f68c'
          }}
        />
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planet" element={<Planet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

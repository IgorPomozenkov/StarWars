import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initPlanets } from '@store/planets/slicer';


const Header: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initPlanets());
  }, []);

  return (
    <header></header>
  );
}

export default Header

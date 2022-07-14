import React, { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { initResidents, clear } from '@/store/planets/slicer';
import { getResidents, planetsLoading } from '@/store/planets/selectors';
import { CircularProgress, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface Planet {
  name: string,
  rotation_period:number,
  orbital_period:number,
  diameter: number,
  climate:string,
  gravity: string,
  terrain:string,
  surface_water:number,
  population:number,
  residents:[]
}

const colorLabel = "white";
const radioChecked = "#f6f68c";


const Planet: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { residents } = useSelector(getResidents, shallowEqual);
  const loading = useSelector(planetsLoading, shallowEqual);
  const [value, setValue] = useState('all');

  const planet = location.state as Planet;

  useEffect(() => {
    if(!planet) navigate('/');
  }, [planet]);

  useEffect(() => {
    if(!!planet) dispatch(initResidents(planet.residents));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clear());
    }
  }, []);

  const residentsFiltered = useMemo(() => (residents || []).filter((resident) => {
    if(resident.gender === value) return true;
    else if(value === 'all') return true;
    else return false;
  }), [value, residents]);

  const handleChange = (e:ChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="planetPage container">
      <button className="btnBack" onClick={() => navigate('/')}>&larr; Back to planets</button>
      <h1 className="planetName">{planet?.name}</h1>
      {
        !!loading && <CircularProgress color="primary" sx={{ position: 'absolute', top: '35%', left: '49%', color: 'white' }} />
      }
      <div className="planetInfo">
        <div className="planetInfo__desc">
          <h2 className="planetInfo__heading">Description</h2>
          <p className="planetInfo__text">Rotation period:<span>{planet?.rotation_period}</span></p>
          <p className="planetInfo__text">Orbital period:<span>{planet?.orbital_period}</span></p>
          <p className="planetInfo__text">Diameter:<span>{planet?.diameter}</span></p>
          <p className="planetInfo__text">Climate:<span>{planet?.climate}</span></p>
          <p className="planetInfo__text">Gravity:<span>{planet?.gravity}</span></p>
          <p className="planetInfo__text">Terrain:<span>{planet?.terrain}</span></p>
          <p className="planetInfo__text">Surface water:<span>{planet?.surface_water}</span></p>
          <p className="planetInfo__text">Population:<span>{planet?.population}</span></p>
        </div>
        <div className="planetInfo__residents">
          <div className="planetInfo__headingWrap">
            <h2 className="planetInfo__heading">Residents</h2>
            <RadioGroup row name="controlled-radio" value={value} onChange={handleChange}>
              <FormControlLabel value="all" control={<Radio sx={{ color: colorLabel, '&.Mui-checked': { color: radioChecked } }} />} label="All" sx={{ height: "30px", color: colorLabel }} />
              <FormControlLabel value="male" control={<Radio sx={{ color: colorLabel, '&.Mui-checked': { color: radioChecked } }} />} label="Male" sx={{ height: "30px", color: colorLabel }} />
              <FormControlLabel value="female" control={<Radio sx={{ color: colorLabel, '&.Mui-checked': { color: radioChecked } }} />} label="Female" sx={{ height: "30px", color: colorLabel }} />
            </RadioGroup>
          </div>
          {!residentsFiltered.length ?
            <p className="planetInfo__text">Residents no</p>
            : residentsFiltered.map((resident, idx) => <div key={idx} className="planetInfo__textWrap">
              <p key={idx} className="planetInfo__text">{resident.name}</p>
              <div className="planetInfo__textHidden">
                <p className="planetInfo__text">Name:<span>{resident.name}</span></p>
                <p className="planetInfo__text">Height:<span>{resident.height}</span></p>
                <p className="planetInfo__text">Mass:<span>{resident.mass}</span></p>
                <p className="planetInfo__text">Hair color:<span>{resident.hair_color}</span></p>
                <p className="planetInfo__text">Skin color:<span>{resident.skin_color}</span></p>
                <p className="planetInfo__text">Eye color:<span>{resident.eye_color}</span></p>
                <p className="planetInfo__text">Birth year:<span>{resident.birth_year}</span></p>
                <p className="planetInfo__text">Gender:<span>{resident.gender}</span></p>
                <p className="planetInfo__text">Homeworld:<span>{planet?.name}</span></p>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Planet

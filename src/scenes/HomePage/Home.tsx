import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPlanets, planetsLoading } from '@/store/planets/selectors';
import { CircularProgress } from '@mui/material';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planets } = useSelector(getPlanets, shallowEqual);
  const loading = useSelector(planetsLoading, shallowEqual);

  return (
    <div className="homePage container">
      <div className="planets">
        {!!loading ?
          <CircularProgress color="primary"
            sx={{ position: 'absolute', top: '30%', left: '49%', color: 'white'}}
          />
          : (planets || []).map((planet, idx) => <div key={idx} className={`planet planet${idx}`} onClick={() => navigate(`/planet`, { state: planet})}>
            <div className="planet__info">
              <img src={`/images/planets/${planet.name}.jpg`} alt={planet.name} />
              <p>{planet.name}</p>
            </div>
            <div className="planet__specif">
              <p className="planet__text">rotation period:<span>{planet.rotation_period}</span></p>
              <p className="planet__text">orbital period:<span>{planet.orbital_period}</span></p>
              <p className="planet__text">diameter:<span>{planet.diameter}</span></p>
              <p className="planet__text">climate:<span>{planet.climate}</span></p>
              <p className="planet__text">gravity:<span>{planet.gravity}</span></p>
              <p className="planet__text">terrain:<span>{planet.terrain}</span></p>
              <p className="planet__text">surface water:<span>{planet.surface_water}</span></p>
              <p className="planet__text">population:<span>{planet.population}</span></p>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Home;

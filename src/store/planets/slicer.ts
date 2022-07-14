import { createSlice, current } from '@reduxjs/toolkit';
import { AppDispatch } from "..";
//import NewDeed from '@/entities/newDeed';

const initialState = {
  planets: [],
  residents: [],
  request: {
    status: 0,
    error: null
  }
}

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanets: (state, { payload }) => {
      state.planets = payload;
      state.request.status = 2;
    },
    setResidents: (state, { payload }) =>  {
      state.residents = [...state.residents, payload];
      state.request.status = 2;
    },
    pending: (state) => {
      state.request.status = 1;
    },
    loaded: (state) => {
      state.request.status = 2;
    },
    failure: (state) => {
      state.request.status = 3;
    },
    clearState: (state) => {
      state.residents = [];
      state.request.status = 0;
    }
  }
});

const { setPlanets, setResidents, pending, loaded, failure, clearState } = planetsSlice.actions
export default planetsSlice.reducer

export const initPlanets = () => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    const res = await fetch('https://swapi.dev/api/planets/');
    const data = await res.json();
    //console.log(data);
    dispatch(setPlanets(data.results));
  }catch(err) {
    console.log(err);
    dispatch(failure());
  }
}

export const initResidents = (api:[]) => async (dispatch:AppDispatch) => {
  try {
    dispatch(pending());
    if(!!api && !!api.length) {
      api.forEach(async url => {
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        dispatch(setResidents(data));
      });
    }else dispatch(failure());
  }catch(err) {
    console.log(err);
    dispatch(failure());
  }
}

export const clear = () => async (dispatch:AppDispatch) => {
  dispatch(clearState());
}

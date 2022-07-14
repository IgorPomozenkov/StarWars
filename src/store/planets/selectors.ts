import { RootState } from "..";

export function getPlanets(state:RootState) {
  return state.planets;
}

export function getResidents(state:RootState) {
  return state.planets;
}

export function planetsLoading(state:RootState) {
  return state.planets.request.status === 1;
}

export function planetsLoaded(state:RootState) {
  return state.planets.request.status === 2;
}

export function planetsailure(state:RootState) {
  return state.planets.request.status === 3;
}

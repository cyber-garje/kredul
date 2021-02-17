import { createReducer, on } from '@ngrx/store';
import { myAction } from './dmc-<%= dasherize(name) %>.action';

export const initialState = 0;

const _dmc<%= classify(name) %>Reducer = createReducer(
  initialState,
  on(myAction, (state) => state + 1),
);

export function dmc<%= classify(name) %>Reducer(state, action) {
  return _dmc<%= classify(name) %>Reducer(state, action);
}

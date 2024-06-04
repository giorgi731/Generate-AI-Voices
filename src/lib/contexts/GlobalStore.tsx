import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentPlan: null,
};

export const SET_CURRENT_PLAN = 'SET_CURRENT_PLAN';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_CURRENT_PLAN:
      return {
        ...state,
        currentPlan: action.payload,
      };
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

const Context = createContext(null);

export const useGlobalState = (): any => {
  const value = useContext(Context);
  if (value === null) throw new Error('Please add GlobalStateProvider');

  return value;
};

export const GlobalStateProvider = ({ children }: any) => (
  <Context.Provider value={useValue() as any}>{children}</Context.Provider>
);

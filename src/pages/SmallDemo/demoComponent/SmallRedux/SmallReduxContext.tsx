import React, { createContext, useContext, useReducer } from 'react';

const reducer = (prevState: any, newState: any) => {
  return {
    ...prevState,
    ...newState,
  };
};

const StateContext = createContext<any>({});
const DispatchContext = createContext<any>({});

function useStateStore() {
  return useContext(StateContext);
}

function useDispatchStore() {
  return useContext(DispatchContext);
}

const StoreProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { useStateStore, useDispatchStore, StoreProvider };

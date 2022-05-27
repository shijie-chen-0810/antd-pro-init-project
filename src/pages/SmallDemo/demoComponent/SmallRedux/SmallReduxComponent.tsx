import { Button } from 'antd';
import React from 'react';
import { useDispatchStore, useStateStore } from './SmallReduxContext';

const SmallReduxComponent: React.FC = () => {
  const stateStore = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <>
      <Button onClick={() => dispatch({ num: (stateStore.num || 0) + 1 })}>触发</Button>
      <div>{stateStore.num}</div>
    </>
  );
};
export default SmallReduxComponent;

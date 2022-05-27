import SmallReduxComponent from './SmallReduxComponent';
import { StoreProvider } from './SmallReduxContext';

const SmallRedux = () => {
  return (
    <StoreProvider>
      <SmallReduxComponent />
    </StoreProvider>
  );
};
export default SmallRedux;

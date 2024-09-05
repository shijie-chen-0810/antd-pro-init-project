import { ConnectProps, connect } from 'umi';
import type { Dispatch } from 'umi';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import SecondPageWrapper from '../SecondPageWrapper';
import type { RootModelState } from '@/models/typing';
import { WarReportReducers } from '@/models/warReport';
import style from './DragDropWarReport.less';
import Material from './components/Material';
import Config from './components/Config';
import Stage from './components/Stage';

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
  dispatch: Dispatch<any>;
}

const DragDropWarReport: React.FC<Props> = ({ dispatch }) => {
  return (
    <SecondPageWrapper beforeGoBack={() => dispatch({ type: WarReportReducers.clearBlockList })}>
      <DndProvider backend={HTML5Backend}>
        <div className={style.container}>
          <Material />
          <Stage />
          <Config />
        </div>
      </DndProvider>
    </SecondPageWrapper>
  );
};
export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(DragDropWarReport);

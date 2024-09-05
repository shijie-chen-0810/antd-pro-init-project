import { ConnectProps, connect } from 'umi';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import SecondPageWrapper from '../SecondPageWrapper';
import type { RootModelState } from '@/models/typing';
import style from './DragDropWarReport.less';
import Material from './components/Material';
import Config from './components/Config';
import Stage from './components/Stage';

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
}

const DragDropWarReport: React.FC<Props> = ({ warReport }) => {
  return (
    <SecondPageWrapper>
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

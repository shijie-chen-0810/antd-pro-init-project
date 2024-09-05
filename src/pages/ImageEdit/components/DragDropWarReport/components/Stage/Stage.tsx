import { ConnectProps, Dispatch, connect, useLocation } from 'umi';
import { MaterialInfo, WarReportReducers } from '@/models/warReport';
import style from './Stage.less';
import { imgList } from '@/utils/varlable';
import { useDrop } from 'react-dnd';
import { DrapAndDropType } from '../..';
import { RootModelState } from '@/models/typing';
import MaterialItem from './MaterialItem';

interface IPosition {
  x: number;
  y: number;
}

const getCorrectDroppedOffsetValue = (
  initialPosition: any,
  finalPosition: any,
  containerEle: HTMLDivElement,
): IPosition => {
  // 获取容器的位置信息 rect 信息包含left top width height
  const dropTargetPosition = containerEle.getBoundingClientRect();

  const { y: finalY, x: finalX } = finalPosition;
  const { y: initialY, x: initialX } = initialPosition;

  // 计算当前位置相对于drop容器的位置.
  // finalY > initialY, 则视为向下拖拽, 否则是向上拖拽
  const newYposition =
    finalY > initialY
      ? initialY + (finalY - initialY) - dropTargetPosition.top
      : initialY - (initialY - finalY) - dropTargetPosition.top;

  const newXposition =
    finalX > initialX
      ? initialX + (finalX - initialX) - dropTargetPosition.left
      : initialX - (initialX - finalX) - dropTargetPosition.left;

  return {
    x: newXposition,
    y: newYposition,
  };
};

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
  dispatch: Dispatch<any>;
}

const Stage: React.FC<Props> = ({ warReport, dispatch }) => {
  const { blockList, selectId } = warReport;
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const imgUrl = imgList[imgIndex].url;
  const [, dropRef] = useDrop({
    accept: DrapAndDropType,
    drop: (payload: MaterialInfo, monitor) => {
      const position = getCorrectDroppedOffsetValue(
        monitor.getInitialSourceClientOffset(), // 拖动元素相对于屏幕左上角的起始位置（偏移量）
        monitor.getSourceClientOffset(), // 拖放完成后当前节点相对于屏幕左上角的位置
        document.querySelector('#drop-container') as HTMLDivElement,
      );
      dispatch({
        type: WarReportReducers.addBlock,
        payload: { ...payload, position },
      });
    },
  });
  return (
    <div className={style.stage}>
      <div className={style.content} ref={dropRef} id="drop-container">
        <img
          src={imgUrl}
          width={'250px'}
          draggable={false}
          onClick={() =>
            dispatch({
              type: WarReportReducers.changeSelectId,
              payload: '',
            })
          }
        />
        {blockList?.map((material) => {
          return <MaterialItem key={material.id} materialItemInfo={material} />;
        })}
      </div>
    </div>
  );
};
export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(Stage);

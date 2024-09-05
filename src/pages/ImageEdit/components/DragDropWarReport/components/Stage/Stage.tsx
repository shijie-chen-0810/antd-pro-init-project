import { ConnectProps, Dispatch, connect, useLocation } from 'umi';
import { MaterialInfo, WarReportReducers } from '@/models/warReport';
import style from './Stage.less';
import { imgList } from '@/utils/varlable';
import { useDrop } from 'react-dnd';
import { DrapAndDropType } from '../..';
import { Rnd } from 'react-rnd';
import { throttle } from 'lodash';
import cs from 'classnames';
import { RootModelState } from '@/models/typing';
import { CloseOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

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
  console.log(blockList, selectId, 'blockList');
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const imgUrl = imgList[imgIndex].url;

  const [, drop] = useDrop({
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
  const handleDeleteBlock = (id: string) => {
    dispatch({
      type: WarReportReducers.deleteBlock,
      payload: { id },
    });
  };
  const changeBlockItemInfo = (id: string, changeInfo: Partial<MaterialInfo>) => {
    dispatch({
      type: WarReportReducers.changeBlock,
      payload: { id, changeInfo },
    });
  };
  return (
    <div className={style.stage}>
      <div className={style.content} ref={drop} id="drop-container">
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
        {blockList?.map((block) => {
          const { id, blockType, width, height, color, text, fontSize, src, position } = block;
          const { x = 0, y = 0 } = position;
          let blockStyle: CSSProperties = { outline: selectId === id ? '1px solid orange' : '' };
          if (blockType === 'text') {
            blockStyle = {
              ...blockStyle,
              color,
              fontSize: `${fontSize}px`,
              lineHeight: `${fontSize}px`,
            };
          }
          if (blockType === 'img') {
            blockStyle = {
              ...blockStyle,
              backgroundImage: `url(${src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            };
          }
          return (
            <Rnd
              key={id}
              enableResizing={{ bottomRight: true }}
              lockAspectRatio={true}
              onResize={throttle((e, a, ele) => {
                const { clientWidth: width, clientHeight: height } = ele;
                changeBlockItemInfo(id, { width, height, fontSize: height });
              }, 100)}
              className={cs(style['water-text'])}
              default={{ x, y, width, height }}
              style={{ ...blockStyle }}
              onDragStop={(e, { x, y }) => changeBlockItemInfo(id, { position: { x, y } })}
              onClick={() => {
                dispatch({
                  type: WarReportReducers.changeSelectId,
                  payload: id,
                });
              }}
            >
              {blockType === 'text' ? text : null}
              <CloseOutlined
                className={style['delete-btn']}
                onClick={() => handleDeleteBlock(id)}
              />
            </Rnd>
          );
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

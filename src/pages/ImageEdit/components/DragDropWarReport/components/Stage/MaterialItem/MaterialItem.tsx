import { RootModelState } from '@/models/typing';
import { MaterialInfo, WarReportReducers } from '@/models/warReport';
import style from './MaterialItem.less';
import { ConnectProps, Dispatch, connect } from 'umi';
import { CSSProperties } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Rnd } from 'react-rnd';
import { throttle } from 'lodash';

interface Props extends ConnectProps {
  materialItemInfo: MaterialInfo;
  warReport: RootModelState['warReport'];
  dispatch: Dispatch<any>;
}

const MaterialItem: React.FC<Props> = ({ warReport, dispatch, materialItemInfo }) => {
  const { selectId } = warReport;
  const { id, blockType, width, height, text, src, position, textStyle } = materialItemInfo;
  const { x = 0, y = 0 } = position;
  const { color, fontSize } = textStyle || {};
  let blockStyle: CSSProperties = { outline: selectId === id ? '1px solid orange' : '' };
  if (blockType === 'text') {
    blockStyle = {
      ...blockStyle,
    };
  }
  const changeBlockItemInfo = (id: string, changeInfo: Partial<MaterialInfo>) => {
    dispatch({
      type: WarReportReducers.changeBlock,
      payload: { id, changeInfo },
    });
  };

  const handleDeleteBlock = (id: string) => {
    dispatch({
      type: WarReportReducers.deleteBlock,
      payload: { id },
    });
  };
  return (
    <Rnd
      key={id}
      enableResizing={{ bottom: true, right: true, bottomRight: true }}
      onResize={throttle((e, a, ele) => {
        const { clientWidth: width, clientHeight: height } = ele;
        changeBlockItemInfo(id, { width, height, textStyle: { fontSize: height } });
      }, 100)}
      className={style['material-item']}
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
      {(() => {
        switch (blockType) {
          case 'text':
            return (
              <span style={{ color, fontSize: `${fontSize}px`, lineHeight: `${fontSize}px` }}>
                {text}
              </span>
            );
          case 'img':
            return <img draggable={false} src={src} width={width} height={height} alt="" />;
          default:
            return;
        }
      })()}
      <CloseOutlined className={style['delete-btn']} onClick={() => handleDeleteBlock(id)} />
    </Rnd>
  );
};

export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(MaterialItem);

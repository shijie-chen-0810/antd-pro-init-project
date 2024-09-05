import type { RootModelState } from '@/models/typing';
import { WarReportReducers } from '@/models/warReport';
import type { MaterialInfo } from '@/models/warReport';
import style from './MaterialItem.less';
import { connect } from 'umi';
import type { ConnectProps, Dispatch } from 'umi';
import type { CSSProperties } from 'react';
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
  const { color, fontSize, textAlign, fontWeight, fontStyle } = textStyle || {};
  const blockStyle: CSSProperties = {
    outline: selectId === id ? '1px solid orange' : '',
  };

  const changeBlockItemInfo = (blockId: string, changeInfo: Partial<MaterialInfo>) => {
    dispatch({
      type: WarReportReducers.changeBlock,
      payload: { id: blockId, changeInfo },
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
      bounds="parent"
      enableResizing={{ bottom: true, right: true, bottomRight: true }}
      onResize={throttle((e, a, ele) => {
        const { clientWidth, clientHeight } = ele;
        changeBlockItemInfo(id, {
          width: clientWidth,
          height: clientHeight,
          textStyle: { fontSize: clientHeight, lineHeight: clientHeight },
        });
      }, 500)}
      className={style['material-item']}
      default={{ x, y, width, height }}
      size={{ width, height }}
      style={{ ...blockStyle }}
      onDragStop={(e, { x, y }) => changeBlockItemInfo(id, { position: { x, y } })}
      onClick={(e: any) => {
        e.stopPropagation();
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
              <span
                style={{
                  color,
                  fontSize: `${fontSize}px`,
                  lineHeight: `${fontSize}px`,
                  textAlign,
                  fontWeight,
                  fontStyle,
                }}
              >
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

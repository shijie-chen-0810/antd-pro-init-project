import { MaterialInfo } from '@/models/warReport';
import style from './DragItem.less';
import { useDrag } from 'react-dnd';
import { DrapAndDropType } from '@/pages/ImageEdit/components/DragDropWarReport';
import { randomString } from '@/utils/utils';

type Props = {
  data: MaterialInfo;
};

const DragItem: React.FC<Props> = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: DrapAndDropType,
    item: { ...data, id: randomString(12) },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={dragRef} style={{ opacity, cursor: 'move' }} className={style['drag-item']}>
      {(() => {
        switch (data.blockType) {
          case 'text':
            return '文本';
          case 'img':
            return '图片';
          default:
            return;
        }
      })()}
    </div>
  );
};
export default DragItem;

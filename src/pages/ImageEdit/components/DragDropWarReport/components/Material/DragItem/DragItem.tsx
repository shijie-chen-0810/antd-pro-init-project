import { MaterialInfo } from '@/models/warReport';
import style from './DragItem.less';
import { useDrag } from 'react-dnd';
import { DrapAndDropType } from '@/pages/ImageEdit/components/DragDropWarReport';

type Props = {
  data: MaterialInfo;
};

const DragItem: React.FC<Props> = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: DrapAndDropType,
    item: { ...data, id: `${new Date().getTime()}` },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={dragRef} style={{ opacity, cursor: 'move' }} className={style['drag-item']}>
      {data.blockType === 'text' ? '文本' : ''}
    </div>
  );
};
export default DragItem;

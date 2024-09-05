import { MaterialInfo } from '@/models/warReport';
import DragItem from './DragItem';
import style from './Material.less';

const materialList: MaterialInfo[] = [
  {
    id: `${new Date().getTime()}`,
    blockType: 'text',
    width: 100,
    height: 24,
    fontSize: 24,
    position: { x: 0, y: 0 },
    text: '双击编辑',
  },
];

const Material = () => {
  return (
    <div className={style.material}>
      {materialList.map((material) => {
        return <DragItem data={material} key={material.blockType} />;
      })}
    </div>
  );
};
export default Material;

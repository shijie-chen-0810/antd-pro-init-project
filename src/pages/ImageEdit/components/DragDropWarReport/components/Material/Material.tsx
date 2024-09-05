import DragItem from './DragItem';
import style from './Material.less';
import { defaultMaterialList } from './defaultMaterial';

const Material = () => {
  return (
    <div className={style.material}>
      {defaultMaterialList.map((material) => {
        return <DragItem data={material} key={material.blockType} />;
      })}
    </div>
  );
};
export default Material;

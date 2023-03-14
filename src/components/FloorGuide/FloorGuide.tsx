import { Anchor } from 'antd';
import style from './FloorGuide.less';

const { Link } = Anchor;
type FloorGuideProps = {
  floorList: { target: string; title: string }[];
};

const FloorGuide: React.FC<FloorGuideProps> = ({ floorList }) => {
  return (
    <div className={style.container}>
      <Anchor affix={false}>
        {floorList.map((floorItem) => {
          return <Link key={floorItem.target} href={floorItem.target} title={floorItem.title} />;
        })}
      </Anchor>
    </div>
  );
};
export default FloorGuide;

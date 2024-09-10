import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import styles from './index.less';

const SlidingBar: React.FC<{ zoom: number; setZoom: (zoom: number) => void }> = ({
  zoom,
  setZoom,
}) => {
  return (
    <div className={styles.SlidingBar}>
      <div className={styles.SlidingBarMain}>
        {/* 缩小 */}
        <button
          onClick={() => {
            if (zoom > 0.2) {
              setZoom(zoom - 0.1);
            }
          }}
          className={styles.small}
        >
          <MinusCircleOutlined className={styles.icon} />
          <p>缩小</p>
        </button>
        {/* 滑动条 */}
        <Slider
          value={zoom}
          step={0.05}
          onChange={setZoom}
          className={styles.progressBar}
          max={5}
          min={0.1}
        />
        {/* 放大 */}
        <button
          className={styles.big}
          onClick={() => {
            if (zoom < 5) {
              setZoom(zoom + 0.1);
            }
          }}
        >
          <PlusCircleOutlined className={styles.icon} />
          <p>放大</p>
        </button>
        {/* <button className={styles.SlidingText} onClick={() => setZoom(1)}>
          恢复到
          <p>100%</p>
        </button> */}
      </div>
    </div>
  );
};

export default SlidingBar;

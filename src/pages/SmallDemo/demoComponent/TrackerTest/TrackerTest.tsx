import TrackerTool from '@/components/TrackerTool';
import {
  TRACKERCLICK,
  TRACKERCLICK1,
  TRACKERDOUBLECLICK1,
} from '@/components/TrackerTool/TrackerFCName';
import { Button, Space } from 'antd';
const TrackerTest = () => {
  const handleClick1 = () => {
    console.log('业务逻辑1');
  };
  const handleClick2 = () => {
    console.log('业务逻辑2');
  };
  const handleClick3 = () => {
    console.log('业务逻辑3');
  };
  return (
    <Space>
      <TrackerTool
        trackerEvents={[
          {
            reactEvent: 'onClick',
            trackerEvent: TRACKERCLICK,
            data: { num: 1 },
          },
          {
            reactEvent: 'onMouseEnter',
            trackerEvent: TRACKERCLICK1,
            data: { num: 2 },
          },
        ]}
      >
        <Button onClick={handleClick1}>触发1</Button>
        <span>123</span>
      </TrackerTool>
      <TrackerTool
        trackerEvents={[
          {
            reactEvent: 'onDoubleClick',
            trackerEvent: TRACKERDOUBLECLICK1,
            data: 123,
          },
        ]}
      >
        <Button onClick={handleClick2}>触发2</Button>
        <Button onClick={handleClick3}>触发3</Button>
      </TrackerTool>
    </Space>
  );
};
export default TrackerTest;

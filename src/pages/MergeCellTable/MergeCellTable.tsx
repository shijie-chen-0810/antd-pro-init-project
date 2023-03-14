import React from 'react';
import GanttChart from '@/components/GanttChart';
import FloorGuide from '@/components/FloorGuide';
import style from './MergeCellTable.less';

const MergeCellTable: React.FC = () => {
  const data = [
    {
      firstColumn: '1月1日',
      deployTimes: [
        {
          time: '2022-08-16 09:44:20',
          // name: '客户1',
          // type: 'receive',
        },
        {
          time: '2022-08-16 10:20:20',
          name: '客户2',
          type: 'input',
        },
        {
          time: '2022-08-16 15:10:20',
          name: '客户3',
          type: 'receive',
        },
      ],
    },
    {
      firstColumn: '1月2日',
      deployTimes: [
        {
          time: '2022-08-16 09:44:20',
          name: '客户1',
          type: 'receive',
        },
        {
          time: '2022-08-16 14:20:20',
          name: '客户2',
          type: 'input',
        },
        {
          time: '2022-08-16 20:10:20',
          name: '客户3',
          type: 'receive',
        },
      ],
    },
  ];
  return (
    <>
      <GanttChart data={data} title="布属日期/时间" />
      <div className={style['floor-container']}>
        <div id="floor1" className={style['floor-item']}>
          内容一
        </div>
        <div id="floor2" className={style['floor-item']}>
          内容二
        </div>
        <div id="floor3" className={style['floor-item']}>
          内容三
        </div>
        <div id="floor4" className={style['floor-item']}>
          内容四
        </div>
        <div id="floor5" className={style['floor-item']}>
          内容五
        </div>
        <div id="floor6" className={style['floor-item']}>
          内容六
        </div>
        <div id="floor7" className={style['floor-item']}>
          内容七
        </div>
        <div id="floor8" className={style['floor-item']}>
          内容八
        </div>
      </div>
      <FloorGuide
        floorList={[
          {
            title: '楼层1',
            target: '#floor1',
          },
          {
            title: '楼层2',
            target: '#floor2',
          },
          {
            title: '楼层3',
            target: '#floor3',
          },
          {
            title: '楼层4',
            target: '#floor4',
          },
          {
            title: '楼层5',
            target: '#floor5',
          },
          {
            title: '楼层6',
            target: '#floor6',
          },
          {
            title: '楼层7',
            target: '#floor7',
          },
          {
            title: '楼层8',
            target: '#floor8',
          },
        ]}
      />
    </>
  );
};

export default MergeCellTable;

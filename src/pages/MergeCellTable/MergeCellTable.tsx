import React from 'react';
import GanttChart from '@/components/GanttChart';

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
  return <GanttChart data={data} title="布属日期/时间" />;
};

export default MergeCellTable;

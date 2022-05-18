import React from 'react';
import GanttChart from '@/components/GanttChart';

const MergeCellTable: React.FC = () => {
  const data = [
    {
      date: '1月1日',
      deployDate: ['2022-08-16 09:44:20', '2022-08-16 10:20:20', '2022-08-16 15:10:20'],
    },
  ];
  return <GanttChart data={data} title="布属日期/时间" />;
};

export default MergeCellTable;

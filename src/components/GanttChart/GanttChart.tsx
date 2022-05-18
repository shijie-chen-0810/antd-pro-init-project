import React from 'react';
import { Table, Tooltip } from 'antd';
import cs from 'classnames';
import style from './GanttChart.less';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

const cellStart = 540;
const cellEnd = 1320;

const onePercentWidth = 1 / (1320 - 540);

type GanttChartProps = {
  title: React.ReactNode;
  data: { date: string; deployDate: string[] }[];
};

const GanttChart: React.FC<GanttChartProps> = ({ title, data }) => {
  const renderTableCell = (record: any) => {
    const { deployDate = [] } = record;
    const analysisDate = (originDate: string) => {
      const timeStamp = new Date(originDate).getTime();
      const hour = new Date(originDate).getHours();
      const minute = new Date(originDate).getMinutes();
      const dateNum = hour * 60 + minute;
      // 计算块开始和截止时间
      let blockStartTime = dateNum - 60;
      let blockEndTime = dateNum + 60;
      if (blockStartTime < cellStart) {
        blockStartTime = cellStart;
      }
      if (blockEndTime > cellEnd) {
        blockEndTime = cellEnd;
      }
      // 计算块宽度和左偏移量
      const width = (blockEndTime - blockStartTime) * onePercentWidth * 100 + '%';
      const left = (blockStartTime - cellStart) * onePercentWidth * 100 + '%';
      return {
        deployTime: moment(timeStamp).format('HH:mm'),
        startTime: moment(timeStamp - 1000 * 60 * 60).format('HH:mm'),
        endTime: moment(timeStamp + 1000 * 60 * 60).format('HH:mm'),
        width,
        left,
      };
    };
    return deployDate.map((date: string) => {
      const { deployTime, startTime, endTime, width, left } = analysisDate(date);
      return (
        <div
          key={date}
          className={cs(style['one-line'], style['deploy-cell'])}
          style={{ width, left }}
        >
          <Tooltip
            title={
              <>
                {`布属时间:${deployTime}`}
                <br />
                {`开始时间:${startTime}`}
                <br />
                {`结束时间:${endTime}`}
              </>
            }
          >
            <span style={{ backgroundColor: '#b7e9ca' }}>{'布属时间:' + deployTime}</span>
          </Tooltip>
        </div>
      );
    });
  };

  const columns: ColumnsType<any> = [
    {
      title,
      dataIndex: 'date',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '09',
      dataIndex: '9',
      width: '50px',
      className: style['cell-container'],
      render: (_, record) => {
        return {
          children: renderTableCell(record),
          props: { colSpan: 13 },
        };
      },
    },
    ...(() =>
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((col: number) => ({
        title: col,
        width: '50px',
        render: () => {
          return {
            children: '',
            props: { colSpan: 0 },
          };
        },
      })))(),
  ];

  return (
    <Table
      className={style['table-container']}
      columns={columns}
      size={'small'}
      rowKey="date"
      pagination={false}
      tableLayout="fixed"
      scroll={{ x: 750 }}
      bordered
      dataSource={data}
    />
  );
};

export default GanttChart;

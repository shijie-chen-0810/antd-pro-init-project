import React from 'react';
import { Table, Tooltip } from 'antd';
import cs from 'classnames';
import style from './GanttChart.less';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

const cellStart = 540;
const cellEnd = 1320;

const onePercentWidth = 1 / (1320 - 540);

const TypeRGB = {
  receive: '104, 211, 100',
  input: '255, 61, 78',
};

type TimeInfo = {
  time: string;
  name?: string;
  type?: string;
};

type GanttChartProps = {
  title: React.ReactNode;
  loading?: boolean;
  data?: { firstColumn: string; deployTimes: TimeInfo[] }[];
};

const GanttChart: React.FC<GanttChartProps> = ({ title, loading, data = [] }) => {
  const renderTableCell = (record: any) => {
    const { deployTimes = [] } = record;
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
    return deployTimes?.map((timeInfo: TimeInfo) => {
      const { deployTime, startTime, endTime, width, left } = analysisDate(timeInfo.time);
      const color = timeInfo.type ? TypeRGB[timeInfo.type] : '104, 211, 100';
      const customerName = timeInfo?.name || '';
      return (
        <Tooltip
          color={`rgba(${color}, 0.9)`}
          key={timeInfo.name + timeInfo.time}
          title={
            <>
              <div>{`${customerName}`}</div>
              <div>{`布署时间:${deployTime}`}</div>
              <div>{`开始时间:${startTime}`}</div>
              <div>{`结束时间:${endTime}`}</div>
            </>
          }
        >
          <div
            className={cs(style['one-line'], style['deploy-cell'])}
            style={{
              width,
              left,
              backgroundColor: `rgba(${color}, 0.5)`,
              border: `1px dashed rgb(${color})`,
            }}
          >
            <span style={{ backgroundColor: `rgba(${color}, 0.7)` }}>
              {'布署时间:' + deployTime}
            </span>
          </div>
        </Tooltip>
      );
    });
  };

  const columns: ColumnsType<any> = [
    {
      title,
      dataIndex: 'firstColumn',
      ellipsis: true,
      width: 135,
      fixed: 'left',
    },
    {
      title: '09',
      dataIndex: '9',
      width: '50px',
      className: style['cell-container'],
      render: (_, record) => {
        return renderTableCell(record);
      },
      onCell: () => {
        return { colSpan: 13 };
      },
    },
    ...(() =>
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((col: number) => ({
        title: col,
        width: '50px',
        render: () => {
          return '';
        },
        onCell: () => {
          return { colSpan: 0 };
        },
      })))(),
  ];

  return (
    <Table
      className={style['table-container']}
      columns={columns}
      locale={{
        emptyText: <div className={style['table-empty-cell']}>今日没有布署日程</div>,
      }}
      size={'small'}
      loading={loading}
      rowKey="firstColumn"
      pagination={false}
      tableLayout="fixed"
      scroll={{ x: 750 }}
      bordered
      dataSource={data}
    />
  );
};

export default GanttChart;

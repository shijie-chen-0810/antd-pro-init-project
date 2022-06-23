/* eslint-disable @typescript-eslint/ban-types */
import { useRequest } from 'ahooks-v2';
import ProCard from '@ant-design/pro-card';
import { Form, DatePicker, Spin } from 'antd';
import ProForm from '@ant-design/pro-form';
import Chart from 'bizcharts/lib/components/Chart';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Axis from 'bizcharts/lib/components/Axis';
import Interaction from 'bizcharts/lib/components/Interaction';
import Interval from 'bizcharts/lib/geometry/Interval';
import Area from 'bizcharts/lib/geometry/Area';
import Line from 'bizcharts/lib/geometry/Line';
import Point from 'bizcharts/lib/geometry/Point';
import moment from 'moment';
import style from './ChartCard.less';
import type { ColorAttrCallback } from 'bizcharts/lib/interface';
import type { ReactNode } from 'react';
import type { AxisLabelCfg } from 'bizcharts/lib/plots/core/dependents';

type ChartCardProps = {
  height?: number;
  isVisibleY?: boolean;
  title?: string | ReactNode;
  scale?: any;
  color: string | [string, string | string[] | ColorAttrCallback] | undefined;
  filter?: string[];
  rorate?: boolean;
  type: 'interval-stack' | 'interval-dodge' | 'area' | 'line' | 'interval-dodge-line';
  defaultInteractions?: string[];
  queryMethod: Function;
  setParams?: Params;
  dataFormat?: Function;
};
type Params = {
  deptIdKey?: string;
  monthKey?: string;
  dayKey?: string;
  otherParams?: any;
};

// 对传进来的参数格式化
const formatParams = (params: any, paramsKeys: Params) => {
  const { deptIdKey, monthKey, dayKey, otherParams } = paramsKeys;
  let _params: any = {};
  if (typeof otherParams === 'object') {
    _params = { ..._params, ...otherParams };
  }
  // 筛选value发生改变
  if (params) {
    const { deptInfo, day, month } = params;
    if (deptInfo && deptIdKey) {
      _params[deptIdKey] = deptInfo[0]?.value;
    }
    if (month && monthKey) {
      _params[monthKey] = moment(month).format('yyyy-MM');
    }
    if (day && dayKey) {
      _params[dayKey] = moment(day).format('yyyy-MM-DD');
    }
    return _params;
  }
  // 第一次请求的时候
  if (monthKey) {
    _params[monthKey] = moment().format('yyyy-MM');
  }
  if (dayKey) {
    _params[dayKey] = moment().format('yyyy-MM-DD');
  }
  return _params;
};

const ChartCard: React.FC<ChartCardProps> = ({
  height = 150,
  isVisibleY,
  title,
  type,
  color,
  scale,
  rorate,
  queryMethod,
  setParams = {},
  dataFormat,
  defaultInteractions,
  filter = [],
}) => {
  const [form] = Form.useForm();
  const {
    data = [],
    loading,
    run: queryData,
  } = useRequest(
    (params) => {
      if (setParams) {
        return queryMethod(formatParams(params, setParams));
      }
      return queryMethod(params);
    },
    {
      formatResult: (res) => {
        if (dataFormat) {
          const filterValue = form.getFieldsValue();
          return dataFormat(res, filterValue);
        }
        return res;
      },
    },
  );

  // 设置今天之后的日期不能选择
  const disabledDate = (currentDate: any) => currentDate && currentDate > moment();
  // 左边的表单
  const extraContent = () => {
    return (
      <ProForm
        form={form}
        layout="inline"
        submitter={false}
        onValuesChange={(_, params) => {
          queryData(params);
        }}
      >
        {filter.includes('month') ? (
          <Form.Item name="month" initialValue={moment()} style={{ width: '100px' }}>
            <DatePicker
              size="small"
              picker="month"
              disabledDate={disabledDate}
              allowClear={false}
            />
          </Form.Item>
        ) : null}
        {filter.includes('day') ? (
          <Form.Item name="day" initialValue={moment()} style={{ width: '120px' }}>
            <DatePicker size="small" picker="date" disabledDate={disabledDate} allowClear={false} />
          </Form.Item>
        ) : null}
      </ProForm>
    );
  };

  return (
    <ProCard hoverable title={title} extra={extraContent()} className={style['procard-container']}>
      <Spin spinning={loading}>
        <Chart
          padding="auto"
          scale={scale}
          data={data}
          autoFit
          appendPadding={[15, 0, 0]}
          height={height}
          defaultInteractions={defaultInteractions}
        >
          {['interval-stack', 'interval-dodge'].includes(type) ? (
            <Interval
              adjust={[
                {
                  type:
                    type === 'interval-stack'
                      ? 'stack'
                      : '' || type === 'interval-dodge'
                      ? 'dodge'
                      : '' || 'dodge',
                  marginRatio: 0,
                },
              ]}
              label={[
                'y',
                (val) => {
                  if (!val) return;
                  if (type === 'interval-dodge') {
                    return {
                      content: val,
                      offsetY: 5,
                      style: {
                        fill: 'gray',
                        fontSize: 12,
                      },
                    };
                  }
                  return {
                    content: val,
                    position: 'middle',
                    style: {
                      fill: 'gray',
                      fontSize: 12,
                    },
                  };
                },
              ]}
              color={color}
              position="x*y"
            />
          ) : null}
          {['line', 'area'].includes(type) ? (
            <>
              <Point
                position="x*y"
                color={color}
                shape="circle"
                label={[
                  'y',
                  (val) => {
                    if (!val) return;
                    return {
                      content: val,
                      offsetY: 5,
                      style: {
                        fill: 'gray',
                        fontSize: 12,
                      },
                    };
                  },
                ]}
              />
              <Line position="x*y" color={color} />
            </>
          ) : null}
          {type === 'area' ? <Area position="x*y" color={color} /> : null}
          <Tooltip shared />
          {['interval-dodge-line'].includes(type) ? (
            <>
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
                color={color}
                position="x*y"
              />
              <Point position="x*y1" color={color} shape="circle" />
              <Axis name="y1" />
              <Line position="x*y1" color={color} />
            </>
          ) : null}
          <Axis
            name="x"
            label={
              rorate
                ? ({
                    rotate: 12.9,
                    offset: 16,
                    style: { textAlign: 'center' },
                  } as AxisLabelCfg)
                : { autoRotate: true }
            }
          />
          <Axis
            visible={isVisibleY ? true : false}
            name="y"
            line={{
              style: {
                stroke: '#ccc',
              }, // 设置坐标轴线样式
            }}
            grid={{
              line: {
                style: {
                  strokeOpacity: 0.5,
                  lineWidth: 1, // 网格线的宽度复制代码
                },
              }, // 设置坐标系栅格样式
            }}
          />
          <Interaction type="active-region" />
        </Chart>
      </Spin>
    </ProCard>
  );
};
export default ChartCard;

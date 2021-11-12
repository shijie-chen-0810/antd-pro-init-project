import { useRequest } from 'ahooks';
import ProCard from '@ant-design/pro-card';
import { Spin } from 'antd';
import { queryCustomerDimensionChartData } from '@/services/dataChart';
import { Chart, Tooltip, Interval, Axis } from 'bizcharts';
import style from './Home.less';

type OutputFormat = {
  x: string | number;
  y: string | number;
  name: string;
};

type formatDataForChartFunction = (
  initData: any[],
  ouputFormat: OutputFormat[],
  dataLength?: number,
) => OutputFormat[];

export const formatDataForChart: formatDataForChartFunction = (
  initData: any[],
  ouputFormat: OutputFormat[],
  dataLength?: number,
) => {
  const initArr: OutputFormat[] = [];
  initData.forEach((item) => {
    const oneGroupData: OutputFormat[] = [];
    ouputFormat.forEach((oneFormat) => {
      oneGroupData.push({
        x: String(item[oneFormat.x]),
        y: item[oneFormat.y],
        name: oneFormat.name,
      });
    });
    initArr.push(...oneGroupData);
  });
  if (dataLength) {
    for (let i = 0; i < dataLength - initData.length; i += 1) {
      const oneGroupData: OutputFormat[] = [];
      ouputFormat.forEach((oneFormat) => {
        oneGroupData.push({
          x: String(initData.length + i + 1),
          y: 0,
          name: oneFormat.name,
        });
      });
      initArr.push(...oneGroupData);
    }
  }
  return initArr;
};

const ChartCard: React.FC = () => {
  const { data = [], loading } = useRequest(
    () => {
      return queryCustomerDimensionChartData({ dimension: 'source' });
    },
    {
      formatResult: (res) => {
        const result = formatDataForChart(res.result, [
          { name: '已成交', x: 'text', y: 'traded' },
          { name: '未成交', x: 'text', y: 'notTraded' },
        ]);
        return result;
      },
    },
  );

  return (
    <ProCard hoverable title={'title'} className={style['procard-container']}>
      <Spin spinning={loading}>
        <Chart padding="auto" scale={{}} data={data} autoFit height={200}>
          <Interval
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0,
              },
            ]}
            color={'name'}
            position="x*y"
          />
          <Tooltip shared />
          <Axis
            name="x"
            label={{
              autoRotate: true,
            }}
          />
        </Chart>
      </Spin>
    </ProCard>
  );
};
export default ChartCard;

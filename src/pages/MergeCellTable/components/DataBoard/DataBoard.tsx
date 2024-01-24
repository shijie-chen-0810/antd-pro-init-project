import { useRequest } from 'ahooks-v2';
import type { Moment } from 'moment';
import { getDataBoardData } from '@/services/smallDemo';
import { Table } from 'antd';
import type { ColumnProps } from 'antd/lib/table';
import style from './DataBoard.less';

type Props = {
  date: Moment;
};

const DataBoard: React.FC<Props> = ({ date }) => {
  const {
    tableProps: { pagination, ...props },
    loading,
  } = useRequest(
    ({ current, pageSize }) =>
      getDataBoardData({ pageNo: current, pageSize, date: date.format('YYYY-MM-DD') }),
    {
      paginated: true,
      refreshDeps: [date],
      formatResult: (res) => ({
        list: res.result.list,
        total: res.result.totals,
      }),
    },
  );
  const columnEnum: ColumnProps<any>[] = [
    {
      title: '日期',
      dataIndex: 'corpNo',
    },
    {
      title: (
        <div>
          <div className={style['column-main-title']}>今日绑定量</div>
          <div className={style['column-sub-title']}>
            <span>公海捞入</span>
            <span>邀约领取</span>
            <span>主管分配</span>
            <span>指派部署</span>
          </div>
        </div>
      ),
      width: '300px',
      render: () => (
        <div className={style['column-sub-content']}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      ),
    },
    {
      title: '14:001',
      dataIndex: 'customerName',
    },
  ];
  return (
    <Table
      size="small"
      rowKey="id"
      dataSource={props.dataSource}
      loading={loading}
      onChange={(pageInfo) => {
        const { current, pageSize, total } = pageInfo;
        props.onChange({ current, pageSize, total });
      }}
      columns={columnEnum}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        size: 'small',
        showTotal: (total) => `共${total}条数据`,
      }}
    />
  );
};
export default DataBoard;

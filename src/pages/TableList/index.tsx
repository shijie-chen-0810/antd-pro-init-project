import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { GlobalState, TablePageState, ConnectProps } from 'umi';
import { Form, Popconfirm, Space, Button, Select } from 'antd';
import { useState } from 'react';
import style from './index.less';
import { connect } from 'dva';

interface TablePageProp extends ConnectProps {
  globalStatus: boolean;
  pageIndex: number;
  changeGlobalStatus: () => void;
  changePageIndex: (step: number) => void;
}

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 21; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '客户标签',
    dataIndex: 'tag',
    hideInTable: true,
    renderFormItem: () => {
      return (
        <Form.Item name="123123123123">
          <Select options={[{ label: '123', value: 123 }]} />
        </Form.Item>
      );
    },
    search: {
      transform: (value, key, valueKeyObj) => {
        console.log(value, key, valueKeyObj, 'value, key, valueKeyObj');
        return { a: 123 };
      },
    },
  },
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    onFilter: false,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    renderFormItem: () => {
      return <Select options={[]} />;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [<a key="link">链路</a>, <a key="link2">报警</a>, <a key="link3">监控</a>],
  },
];

const TablePage = ({
  globalStatus,
  pageIndex,
  changeGlobalStatus,
  changePageIndex,
}: TablePageProp) => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <>
      <div>
        {String(globalStatus)}
        <button
          onClick={() => {
            changeGlobalStatus();
          }}
        >
          change
        </button>
      </div>
      <div>
        {String(pageIndex)}
        <button
          onClick={() => {
            changePageIndex(2);
          }}
        >
          change
        </button>
      </div>
      <ProTable<TableListItem>
        className={style['pro-table']}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log({ activeTab, ...params }, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'horizontal',
          span: 6,
        }}
        footer={() => {
          return (
            <Space>
              <Popconfirm placement="top" title="确认导出?" okText="导出" cancelText="取消">
                <Button>导出</Button>
              </Popconfirm>
            </Space>
          );
        }}
        dateFormatter="string"
        options={{ fullScreen: true, setting: true, reload: false }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeTab,
            items: [
              {
                key: 'tab1',
                label: <span>应用</span>,
              },
              {
                key: 'tab2',
                label: <span>项目</span>,
              },
              {
                key: 'tab3',
                label: <span>文章</span>,
              },
            ],
            onChange: (key) => {
              setActiveTab(key as string);
            },
          },
        }}
      />
    </>
  );
};

export default connect(
  ({ global, tablePage }: { global: GlobalState; tablePage: TablePageState }) => {
    return {
      ...global,
      ...tablePage,
    };
  },
  (dispatch) => {
    return {
      changeGlobalStatus() {
        dispatch({
          type: 'global/changeStatus',
          payload: '123',
        });
      },
      changePageIndex(step: number) {
        dispatch({
          type: 'tablePage/addPageIndex',
          payload: step,
        });
      },
    };
  },
)(TablePage);

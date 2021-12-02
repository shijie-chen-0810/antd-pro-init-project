import React, { useState, useRef } from 'react';
import { useModel } from 'umi';
import ProTable from '@ant-design/pro-table';
import type { FormInstance } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { INSPECT_TAB_KEY as tabs } from '@/utils/varlable';
import { queryTableList } from '@/services/tableList';
import { columnsMap } from './columnsMap';

const Index: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>(tabs.all);

  const formRef = useRef<FormInstance>();
  const tableRef = useRef<ActionType>();
  const { matchColumns, countWidth } = useModel('useColumnsEnum');

  const action: ProColumns = {
    title: '操作',
    key: 'option',
    align: 'center',
    fixed: 'right',
    width: 150,
    valueType: 'option',
    render: () => <a>查看详情</a>,
  };

  const filterParam = (param: any) => {
    return { ...param };
  };

  const tableColumn = matchColumns([...columnsMap[activeKey], action]);
  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      <ProTable
        columns={tableColumn}
        rowKey="id"
        scroll={{
          x: countWidth(tableColumn),
        }}
        formRef={formRef}
        actionRef={tableRef}
        dateFormatter="string"
        debounceTime={0}
        search={{
          labelWidth: 130,
          searchText: '筛选',
        }}
        params={{ queryType: activeKey }}
        request={async (param: any) => {
          const data = await queryTableList(filterParam(param));
          return {
            data: data?.result?.list,
            success: true,
            total: data?.result?.totals,
          };
        }}
        pagination={{
          size: 'small',
          defaultPageSize: 10,
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey,
            items: [
              {
                key: tabs.all,
                label: <span>tab1</span>,
              },
              {
                key: tabs.inspecting,
                label: <span>tab2</span>,
              },
              {
                key: tabs.completed,
                label: <span>tab3</span>,
              },
            ],
            onChange: (key) => {
              tableRef.current?.reset?.();
              setActiveKey(key as string);
            },
          },
        }}
      />
    </div>
  );
};

export default Index;

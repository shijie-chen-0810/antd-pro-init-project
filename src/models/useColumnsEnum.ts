import type { ProColumns } from '@ant-design/pro-table';

type config = {
  dataIndex: string;
  config: ProColumns;
};

export default function useColumnsEnum() {
  // 表格列枚举
  const tableColumns = {
    corpNo: {
      title: '客户编号',
      ellipsis: true,
      dataIndex: 'corpNo',
      fixed: 'left',
      width: 150,
    },
    customerName: {
      title: '客户名称',
      ellipsis: true,
      dataIndex: 'customerName',
      fixed: 'left',
      width: 200,
    },
  };

  const matchColumns = (columns: (string | object)[], configs?: config[]) => {
    const result = columns.map((item: string | object) => {
      if (typeof item === 'string') {
        const [name, key, search] = item.split('-');
        const temp = {
          ...tableColumns[name],
        };
        if (key) {
          temp.dataIndex = key;
        }
        if (search && search === 'table') {
          temp.hideInSearch = true;
        }
        if (search && search === 'search') {
          temp.hideInTable = true;
        }
        return temp;
      }
      return item;
    });
    return result.map((item: ProColumns) => {
      let _item = { ...item };
      configs?.forEach((config) => {
        if (_item?.dataIndex === config?.dataIndex) {
          _item = { ..._item, ...config?.config };
        }
      });
      return _item;
    });
  };

  // 计算所有列的宽度
  const countWidth = (columns: (string | object)[]) => {
    let width = 0;
    columns.forEach((item: any) => {
      if (typeof item === 'object') {
        width += Number(item?.width || 0);
        return;
      }
    });
    return width;
  };

  return {
    matchColumns,
    countWidth,
  };
}

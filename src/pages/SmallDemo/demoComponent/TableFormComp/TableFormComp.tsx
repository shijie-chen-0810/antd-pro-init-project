// import TableForm from '@/components/TableForm';

// const TableFormComp = () => {
//   return (
//     <div>
//       <TableForm />
//     </div>
//   );
// };
// export default TableFormComp;

import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormDigit } from '@ant-design/pro-form';
import { ProFormDependency, ProFormSelect } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { Button, Col, Row } from 'antd';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const formRef = useRef<ProFormInstance<any>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: () => {
        return {
          rules: [
            {
              required: formRef.current?.getFieldValue('nameRequired') === '1',
              message: '此项为必填项',
            },
          ],
        };
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: '全部',
        open: '未解决',
        closed: '已解决',
      },
      formItemProps: () => {
        return {
          rules: [
            {
              required: formRef.current?.getFieldValue('statusRequired') === '1',
              message: '此项为必填项',
            },
          ],
        };
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
      formItemProps: () => {
        return {
          rules: [
            {
              required: formRef.current?.getFieldValue('timeRequired') === '1',
              message: '此项为必填项',
            },
          ],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
    },
  ];

  return (
    <ProForm<{
      table: DataSourceType[];
    }>
      formRef={formRef}
      initialValues={{
        table: defaultData,
      }}
      onFinish={async (value: any) => {
        console.log(value, 'value');
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <ProFormDigit
            label="最大行数"
            name="rowNum"
            fieldProps={{
              onChange: () => {
                formRef.current?.setFieldsValue({
                  table: [],
                });
              },
            }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <ProFormSelect
            label="活动名称是否必填"
            name="nameRequired"
            valueEnum={{ 1: 'true', 0: 'false' }}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            label="状态是否必选"
            name="statusRequired"
            valueEnum={{ 1: 'true', 0: 'false' }}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            label="时间是否必选"
            name="timeRequired"
            valueEnum={{ 1: 'true', 0: 'false' }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <ProFormDependency
            name={['rowNum', 'nameRequired', 'statusRequired', 'timeRequired', 'table']}
          >
            {() => {
              return (
                <EditableProTable<DataSourceType>
                  rowKey="id"
                  size="small"
                  maxLength={(formRef.current?.getFieldValue?.('rowNum') || 1) + 1}
                  name="table"
                  columns={columns}
                  recordCreatorProps={{
                    position: 'bottom',
                    record: () => {
                      console.log(formRef.current?.getFieldValue?.('table')?.length);
                      const curId = (Math.random() * 1000000).toFixed(0);
                      return { id: curId };
                    },
                    disabled:
                      formRef.current?.getFieldValue?.('table')?.length >=
                      (formRef.current?.getFieldValue?.('rowNum') || 1),
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, defaultDom) => {
                      const copy = (
                        <EditableProTable.RecordCreator
                          key="copy"
                          record={{
                            ...row,
                            id: (Math.random() * 1000000).toFixed(0),
                          }}
                        >
                          <Button
                            type="link"
                            disabled={
                              formRef.current?.getFieldValue?.('table')?.length >=
                              (formRef.current?.getFieldValue?.('rowNum') || 1)
                            }
                          >
                            复制
                          </Button>
                        </EditableProTable.RecordCreator>
                      );
                      return [defaultDom.delete, copy];
                    },
                  }}
                  formItemProps={{
                    label: '12345',
                    rules: [
                      {
                        validator: (rule, value) => {
                          console.log(value, 'value');
                          if (!value?.length) {
                            return Promise.reject('必须有一项');
                          }
                          return Promise.resolve();
                        },
                      },
                    ],
                  }}
                />
              );
            }}
          </ProFormDependency>
        </Col>
      </Row>
    </ProForm>
  );
};

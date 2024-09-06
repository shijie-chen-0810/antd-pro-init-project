import type { ReactElement } from 'react';
import React, { useEffect, useImperativeHandle, useReducer, useState } from 'react';
import type { PosterMeta } from '@/pages/Editor/types';
import styles from './index.less';
import { Avatar, Empty, Form, Image, Input, InputNumber, Select, Space, Tabs, Tag } from 'antd';
import TabPane from '@ant-design/pro-card/es/components/TabPane';
import type { Node } from '@/pages/Editor/Render/Engine';
import { DeleteOutlined } from '@ant-design/icons';
import { onlyUnique } from '@/utils/utils';

export interface EditPanelProps {
  meta: PosterMeta; // 文档信息，
  onMetaChange: (key: keyof PosterMeta, value: any) => void;
  selectNode: Node<any>;
  template: boolean;
  onValueChange: (key: any, value: any) => void;
}

export interface EditPanelRef {
  handleUpdate: () => void;
}

const EditPanel = React.forwardRef<EditPanelRef, EditPanelProps>((props, ref) => {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  const [form, setForm] = useState<{ name: string; key: string; component: ReactElement }[]>([]);

  useImperativeHandle(ref, () => ({
    handleUpdate: () => {
      forceUpdate();
    },
  }));

  const [activeKey, setActiveKey] = useState<string>('1');
  useEffect(() => {
    setActiveKey('1');
    if (!props.selectNode) return;
    setActiveKey('2');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let form: { name: string; key: string; component: ReactElement; all?: boolean }[] = [];
    switch (props.selectNode.type) {
      case 'Text':
        form = [
          {
            name: '文本',
            key: 'text',
            component: (
              <Input onChange={(e) => props.onValueChange('text', e.target.value || '')} />
            ),
          },
          { name: '字号', key: 'fontSize', component: <InputNumber /> },
          {
            name: '颜色',
            key: 'fill',
            component: (
              <Input type="color" onChange={(e) => props.onValueChange('fill', e.target.value)} />
            ),
          },
        ];
        break;
      case 'Image':
        form = [
          { name: '宽度', key: 'width', component: <InputNumber /> },
          { name: '高度', key: 'height', component: <InputNumber /> },
          { name: '圆角', key: 'roundness', component: <InputNumber /> },
        ];
        break;
      case 'Figure':
        form = [
          { name: '字号', key: 'fontSize', component: <InputNumber /> },
          { name: '横向缩放', key: 'scaleX', component: <InputNumber /> },
          { name: '纵向缩放', key: 'scaleY', component: <InputNumber /> },
          { name: '圆角', key: 'roundness', component: <InputNumber /> },
        ];
        break;
    }

    setForm(form);
  }, [props.selectNode]);

  return (
    <div className={styles.panel}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab="页面编辑" key="1">
          <Form name="t" wrapperCol={{ span: 16 }}>
            <Form.Item label="海报名称">
              <Input
                defaultValue={props.meta.title}
                onChange={(v) => props.onMetaChange('title', v.target.value)}
              />
            </Form.Item>
            <Form.Item label="画布宽度">
              <InputNumber
                precision={0}
                className={styles.inputShape}
                value={props.meta.width}
                onChange={(v) => props.onMetaChange('width', v || 0)}
              />
            </Form.Item>

            <Form.Item label="画布高度">
              <InputNumber
                precision={0}
                className={styles.inputShape}
                value={props.meta.height}
                onChange={(v) => props.onMetaChange('height', v || 0)}
              />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="图层属性" key="2">
          {props.selectNode ? (
            <Form name="p" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {form
                .filter((item) => {
                  if (props.template) {
                    if (item.key === 'user') {
                      return false;
                    } else {
                      return true;
                    }
                  }
                  return true;
                })
                .map((v: any) => {
                  return (
                    <Form.Item label={v.name} key={v.name}>
                      {{
                        ...v.component,
                        props: {
                          ...v.component.props,
                          className: [
                            ...(v.component.props?.className || []),
                            styles.inputShape,
                          ].join(' '),
                          value: v.all ? props.selectNode : (props.selectNode as any)[v.key],
                          onChange: v.component.props.onChange
                            ? v.component.props.onChange
                            : (e: any) => props.onValueChange(v.key, Math.floor(e) || 0),
                        },
                      }}
                    </Form.Item>
                  );
                })}
              <Form.Item label="X">
                <InputNumber
                  className={styles.inputShape}
                  value={props.selectNode.x}
                  onChange={(e) => props.onValueChange('x', e || 0)}
                />
              </Form.Item>

              <Form.Item label="Y">
                <InputNumber
                  className={styles.inputShape}
                  value={props.selectNode.y}
                  onChange={(e) => props.onValueChange('y', e || 0)}
                />
              </Form.Item>
              <Form.Item label="旋转">
                <InputNumber
                  className={styles.inputShape}
                  value={props.selectNode.rotation}
                  onChange={(e) => props.onValueChange('rotation', e || 0)}
                />
              </Form.Item>
            </Form>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无选中图层" />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
});

export default EditPanel;

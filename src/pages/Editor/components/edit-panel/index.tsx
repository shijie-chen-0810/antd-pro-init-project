import type { ReactElement } from 'react';
import React, { useEffect, useImperativeHandle, useReducer, useState } from 'react';
import type { PosterMeta } from '@/pages/Editor/types';
import styles from './index.less';
import { Button, Empty, Form, Input, InputNumber, Select, Tabs, Image, Switch } from 'antd';
import TabPane from '@ant-design/pro-card/es/components/TabPane';
import type { Node, Text } from '@/pages/Editor/Render/Engine';
import MaterialRepo from '@/components/MaterialRepo';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { get } from 'lodash';

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

interface FormProps {
  name: string;
  key: string;
  isDynamic?: boolean;
  hide?: boolean;
  valueKey?: string;
  valuePath?: string;
  component: ReactElement | ((payload: any) => ReactElement);
}

const EditPanel = React.forwardRef<EditPanelRef, EditPanelProps>((props, ref) => {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);
  const [visible, setVisible] = useState<boolean>(false);

  const [form, setForm] = useState<FormProps[]>([]);

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
    let form: FormProps[] = [];
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
          {
            name: '表单字段',
            key: 'isForm',
            isDynamic: true,
            hide: false,
            component: (selectNode) => {
              return (
                <>
                  <Form.Item label="表单字段">
                    <Select
                      options={[
                        { label: '是', value: true },
                        { label: '否', value: false },
                      ]}
                      value={(props.selectNode as any).isForm}
                      onChange={(value) => props.onValueChange('isForm', value)}
                    />
                  </Form.Item>
                  {selectNode.isForm ? (
                    <>
                      <Form.Item label="必填">
                        <Select
                          options={[
                            { label: '是', value: true },
                            { label: '否', value: false },
                          ]}
                          value={(props.selectNode as Text).formConfig?.isRequired}
                          onChange={(isRequired) =>
                            props.onValueChange('formConfig', { isRequired })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="字段名">
                        <Input
                          value={(props.selectNode as Text).formConfig?.label}
                          onChange={(e) =>
                            props.onValueChange('formConfig', { label: e.target.value })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="字段Key">
                        <Input
                          value={(props.selectNode as Text).formConfig?.name}
                          onChange={(e) =>
                            props.onValueChange('formConfig', { name: e.target.value })
                          }
                        />
                      </Form.Item>
                    </>
                  ) : null}
                </>
              );
            },
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

    setForm(form.filter((item) => !item.hide));
  }, [props.selectNode]);

  return (
    <div className={styles.panel}>
      <MaterialRepo
        visible={visible}
        visibleChange={setVisible}
        onFinish={(urls) => {
          if (urls && urls.length > 0) {
            props.onMetaChange(
              'bgSrc',
              urls[0].replace('//qzz-material.forwe.store', '//qzz-fadmin.forwe.store'),
            );
          }
        }}
      />
      <Tabs activeKey={activeKey} onChange={setActiveKey} className={styles.tabs}>
        <TabPane tab="页面编辑" key="1">
          <Form name="t" wrapperCol={{ span: 16 }}>
            <Form.Item label="海报名称">
              <Input
                value={props.meta.title}
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
            <Form.Item label="画布背景">
              {props.meta.bgSrc ? (
                <div className={styles.bg}>
                  <Image preview={false} width={155} height={290} src={props.meta.bgSrc} />
                  <div className={styles.imgBg}>
                    <Button onClick={() => setVisible(true)} type="primary">
                      修改背景
                    </Button>
                  </div>
                  <div onClick={() => props.onMetaChange('bgSrc', '')} className={styles.close}>
                    <DeleteOutlined />
                  </div>
                </div>
              ) : (
                <div className={styles.uploader} onClick={() => setVisible(true)}>
                  <PlusOutlined />
                  点击上传背景图片
                </div>
              )}
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="图层属性" key="2">
          {props.selectNode ? (
            <Form name="p" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {form
                .filter((item) => !item.isDynamic)
                .map((v: any) => (
                  <Form.Item label={v.name} key={v.name}>
                    {{
                      ...v.component,
                      props: {
                        ...v.component.props,
                        className: [
                          ...(v.component.props?.className || []),
                          styles.inputShape,
                        ].join(' '),
                        [v.valueKey ? v.valueKey : 'value']: v.valuePath
                          ? get(props.selectNode, v.valuePath)
                          : (props.selectNode as any)[v.key],
                        onChange: v.component.props.onChange
                          ? v.component.props.onChange
                          : (e: any) => props.onValueChange(v.key, Math.floor(e) || 0),
                      },
                    }}
                  </Form.Item>
                ))}
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
              <Form.Item label="是否可拖拽">
                <Switch
                  style={{ width: 35 }}
                  checked={props.selectNode.nodeConfig.canDrag}
                  onChange={(canDrag) => props.onValueChange('nodeConfig', { canDrag })}
                />
              </Form.Item>
              <Form.Item label="是否可缩放">
                <Switch
                  style={{ width: 35 }}
                  checked={props.selectNode.nodeConfig.canScale}
                  onChange={(canScale) => props.onValueChange('nodeConfig', { canScale })}
                />
              </Form.Item>
              <Form.Item label="是否可删除">
                <Switch
                  style={{ width: 35 }}
                  checked={props.selectNode.nodeConfig.canDelete}
                  onChange={(canDelete) => props.onValueChange('nodeConfig', { canDelete })}
                />
              </Form.Item>
              {form
                .filter((item) => item.isDynamic)
                .map((v) => (
                  <div key={v.key}>
                    {typeof v.component === 'function' ? v.component(props.selectNode) : null}
                  </div>
                ))}
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

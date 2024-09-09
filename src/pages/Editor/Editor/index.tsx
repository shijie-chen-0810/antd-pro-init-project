import Render from '@/pages/Editor/Render';
import React, { useRef, useState } from 'react';
import { Button, Layout, Modal, PageHeader, Popconfirm, Space, Image } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import styles from './index.less';
import ModuleLib from '@/pages/Editor/components/module-lib/module-lib';
import type { EditPanelRef } from '@/pages/Editor/components/edit-panel/index';
import EditPanel from '@/pages/Editor/components/edit-panel/index';
import type { PosterMeta } from '@/pages/Editor/types';
import type { Node } from '@/pages/Editor/Render/Engine';
import queryString from 'query-string';
import { LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import { history } from 'umi';
import SlidingBar from '@/components/SlidingBar';

const Editor: React.FC = () => {
  const [currentSelect, setCurrentSelect] = useState<Node<any> | undefined>();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>();
  const [zoom, setZoom] = useState<number>(0.4);

  const [meta, setMeta] = useState<PosterMeta>({
    title: '激励海报',
    type: 'team',
    width: 844,
    height: 1500,
    bgSrc: '',
  });

  const { template } = queryString.parse(location.hash.split('?')[1]);

  const stageRef = useRef<Render | null>(null);

  const editorRef = useRef<EditPanelRef | null>(null);

  const handleMetaChange = (key: keyof PosterMeta, value: any) => {
    setMeta({ ...meta, [key]: value });
  };

  const handleNodeValueChange = (key: any, value: any) => {
    if (currentSelect) {
      (currentSelect as any)[key] = value;
    }
    editorRef.current?.handleUpdate();
    stageRef.current?.update();
  };

  const handleStageUpdate = () => {
    editorRef.current?.handleUpdate();
  };
  const getExtra = () => {
    return [
      <Button
        key="preview"
        type="primary"
        onClick={async () => {
          await stageRef.current?.saveToImage(meta.title, meta.width, meta.height, (src: any) => {
            setImgSrc(src);
          });
          setPreviewOpen(true);
        }}
      >
        预览
      </Button>,
      <Button
        key="save"
        type="primary"
        onClick={() => {
          console.log(stageRef.current?.toJson());
        }}
      >
        <SaveOutlined />
        保存
      </Button>,
    ];
  };

  return (
    <div className={styles.editor}>
      <PageHeader
        ghost={false}
        backIcon={false}
        title={
          <Space>
            <Popconfirm title="正在编辑中，是否确认返回" onConfirm={() => history.goBack()}>
              <Button>
                <LogoutOutlined /> 退出
              </Button>
            </Popconfirm>
            {meta.title}
          </Space>
        }
        extra={getExtra()}
      />
      <Layout className={styles.layoutStyle}>
        <Sider theme={'light'} width={107}>
          <ModuleLib template={!!template} />
        </Sider>
        <Content className={styles.layoutContent}>
          <Render
            ref={stageRef}
            template={!!template}
            width={meta.width}
            height={meta.height}
            bgSrc={meta.bgSrc}
            zoom={zoom}
            onSelect={(node) => node && setCurrentSelect(node)}
            onUpdate={handleStageUpdate}
          />
          <SlidingBar zoom={zoom} setZoom={setZoom} />
        </Content>

        <Sider width={300} theme={'light'}>
          <EditPanel
            ref={editorRef}
            template={!!template}
            meta={meta}
            onMetaChange={handleMetaChange}
            selectNode={currentSelect as Node<any>}
            onValueChange={handleNodeValueChange}
          />
        </Sider>
      </Layout>
      <Modal open={previewOpen} onCancel={() => setPreviewOpen(false)}>
        <Image width={300} src={imgSrc} />
      </Modal>
    </div>
  );
};

export default Editor;

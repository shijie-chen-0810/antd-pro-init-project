import Render from '@/pages/Editor/Render';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Layout, Modal, PageHeader, Popconfirm, Space, Image, message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import styles from './index.less';
import ModuleLib from '@/pages/Editor/components/module-lib/module-lib';
import type { EditPanelRef } from '@/pages/Editor/components/edit-panel/index';
import EditPanel from '@/pages/Editor/components/edit-panel/index';
import type { PosterMeta, StageData } from '@/pages/Editor/types';
import type { Node } from '@/pages/Editor/Render/Engine';
import { LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import { history } from 'umi';
import SlidingBar from '@/components/SlidingBar';
import { useRequest } from 'ahooks-v2';
import { getStageData, insertStageData } from '@/services/ant-design-pro/api';
import { getParam } from '@/utils/utils';

const Editor: React.FC = () => {
  const [currentSelect, setCurrentSelect] = useState<Node<any> | undefined>();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>();
  const [zoom, setZoom] = useState<number>(0.45);

  const [stageData, setStageData] = useState<StageData>({
    width: 850,
    height: 1500,
    bgSrc: '',
  });
  const [meta, setMeta] = useState<PosterMeta>({
    title: '战报',
    templateType: 'normal',
  });

  const stageRef = useRef<Render | null>(null);

  const editorRef = useRef<EditPanelRef | null>(null);

  const { run: runInsertStageData } = useRequest(insertStageData, {
    manual: true,
    onSuccess: (res) => {
      if (res.result) {
        message.success('保存成功');
        // history.replace('/imageEdit');
      }
    },
  });
  const { run: runGetStageData } = useRequest(getStageData, {
    manual: true,
    onSuccess: (res) => {
      const result = res.result;
      const config = JSON.parse(result.config);
      if (result) {
        stageRef.current?.fromJson(config);
        setMeta({ title: result.title, templateType: result.templateType });
        setStageData({ width: config.width, height: config.height, bgSrc: config.bgSrc });
      }
    },
  });

  const handleMetaChange = (key: keyof PosterMeta, value: any) => {
    setMeta({ ...meta, [key]: value });
  };
  const handleStageChange = (key: keyof StageData, value: any) => {
    setStageData({ ...stageData, [key]: value });
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

  const handleSave = () => {
    const stageData = stageRef.current?.toJson();
    console.log({ ...meta, config: JSON.stringify(stageData) }, 'data');
    runInsertStageData({ ...meta, config: JSON.stringify(stageData) });
  };

  useEffect(() => {
    const templateId = getParam('templateId');
    if (!!templateId) {
      runGetStageData();
    }
  }, []);

  const getExtra = () => {
    return [
      <Button
        key="preview"
        type="primary"
        onClick={async () => {
          await stageRef.current?.saveToImage(
            meta.title,
            stageData.width,
            stageData.height,
            (src: any) => {
              setImgSrc(src);
            },
          );
          setPreviewOpen(true);
        }}
      >
        预览
      </Button>,
      <Button key="save" type="primary" onClick={handleSave}>
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
          <ModuleLib />
        </Sider>
        <Content className={styles.layoutContent}>
          <Render
            ref={stageRef}
            title={meta.title}
            width={stageData.width}
            height={stageData.height}
            bgSrc={stageData.bgSrc}
            zoom={zoom}
            onSelect={(node) => setCurrentSelect(node)}
            onUpdate={handleStageUpdate}
          />
          <SlidingBar zoom={zoom} setZoom={setZoom} />
        </Content>

        <Sider width={300} theme={'light'}>
          <EditPanel
            ref={editorRef}
            stage={stageData}
            meta={meta}
            onMetaChange={handleMetaChange}
            onStageChange={handleStageChange}
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

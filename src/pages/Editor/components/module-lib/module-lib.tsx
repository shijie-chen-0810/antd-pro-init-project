import React, { useState } from 'react';
import styles from './module-lib.less';
import { Image, List } from 'antd';
import type { Module } from '@/pages/Editor/types';

const DefaultModuleList: Module[] = [
  {
    name: '文字',
    // icon: <FileTextOutlined />,
    icon: 'https://cdn.codeboxes.cn/static/credits/img/assets/ic_edit_wz_nor%402x.png',
    id: '__Text',
    type: 'Text',
  },
  {
    name: '素材',
    // icon: <PictureOutlined />,
    icon: 'https://cdn.codeboxes.cn/static/credits/img/assets/ic_edit_sc_nor%402x.png',
    id: '__Image',
    type: 'Image',
  },
  {
    name: '员工',
    // icon: <UserOutlined />,
    icon: 'https://cdn.codeboxes.cn/static/credits/img/assets/ic_edit_yg_nor%402x.png',
    id: '__Figure',
    type: 'Figure',
  },
];

export interface ModuleLibProps {
  template: boolean;
}

const ModuleLib: React.FC<ModuleLibProps> = ({ template }) => {
  const [dataList, setDataList] = useState<Module[]>(DefaultModuleList);

  const handleDragStart = (e: React.DragEvent, target: Module) => {
    e.dataTransfer.setData('module', JSON.stringify(target));
  };

  return (
    <div className={styles.modalLib}>
      {/* <div className={styles.title}>组件库</div> */}
      <div className={styles.moduleList}>
        <List
          grid={{ gutter: 0, column: 1 }}
          dataSource={dataList}
          renderItem={(item) => {
            return (
              <List.Item
                draggable={true}
                onDragStart={(e) => handleDragStart(e, item)}
                className={styles.moduleItem}
                key={item.id}
              >
                <div className={styles.icon}>
                  {typeof item.icon === 'string' ? (
                    <Image className={styles.iconImg} src={item.icon} preview={false} />
                  ) : (
                    item.icon
                  )}
                </div>
                <div className={styles.name}>{item.name}</div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ModuleLib;

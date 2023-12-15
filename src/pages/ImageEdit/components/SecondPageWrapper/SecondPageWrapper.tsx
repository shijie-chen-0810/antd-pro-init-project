import { LeftOutlined } from '@ant-design/icons';
import style from './SecondPageWrapper.less';
import { Button, Divider } from 'antd';
import type { PropsWithChildren } from 'react';
import React from 'react';

const SecondPageWrapper: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className={style.container}>
      <Button onClick={() => history.go(-1)} type="link">
        <LeftOutlined />
        返回
      </Button>
      <Divider style={{ margin: '5px 0 0' }} />
      {children}
    </div>
  );
};
export default SecondPageWrapper;

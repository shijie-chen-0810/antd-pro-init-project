import React from 'react';
import welcome from '@/assets/imgs/welcome.png';
import style from './Home.less';

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <img src={welcome} alt="" />
      <div className={style.right}>
        <span className={style.title}>欢迎</span>
        <span className={style.desc}>登录鑫业务系统~</span>
      </div>
    </div>
  );
};

export default Welcome;

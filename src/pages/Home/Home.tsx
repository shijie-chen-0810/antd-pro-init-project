import React from 'react';
import welcome from '@/assets/imgs/welcome.png';
import style from './Home.less';
import ProForm from '@ant-design/pro-form';

// const getHotlineClientSDK = window.HotlineClientApi.default;
// const SDK = getHotlineClientSDK({
//   instanceId: 'ccc_xp_pre-cn-78v1gnp97002',
//   token:
//     'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MTcxOTkyMDEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiMjQ3ODhiNTQtMzZmNS00MTkzLTlhMWUtZDJhNmM0Y2I4YzdhIiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.PzybtrNzpAITSkmMB4uzbWfWuDqfTKb9wg-gHWsyvyMZKn74ZA2zon9-lzeJrQ1uUfeHQYqAMoYMBIoKu9pg55qJB19Lm_l5ii-eKwAMcBzAnlmztMhcnqavxYEkON19140XhiwEZYgTBGfMZRKdxZTsk8pc_j_eCT657W6ONpOFvttzZoqgLKlL2g5UOuq_pJR8cAc3DUKUs0ofScT5n-Hfqqr1v-VRCVWh87XQVid8N22z-NMtXj-tjfjyCzoE8GvDjsA76FBpkxO-USr3pNDfXggIyusyYNbLicQZx_RIbgfDFGn-0kInlx5584va5UILJhpYGW0bDnfxxh-jiA',
// });

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <ProForm />
      <img src={welcome} alt="" />
      <div className={style.right}>
        <span className={style.title}>欢迎</span>
        <span className={style.desc}>登录鑫业务系统~</span>
      </div>
    </div>
  );
};

export default Welcome;

import { useEffect } from 'react';

// const config = {
//   className: 'root-class',
//   //上行rest请求域名
//   baseURL: 'api.rhinokeen.com',
//   //下行websocket域名
//   wsURL: 'msgx-space.aliyun.com',
//   //租户实例id
//   instanceId: 'ccc_xp_pre-cn-78v1gnp97002',
//   //当前用户登录token
//   token:
//     'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZGV2ZWxvcGVyLnJoaW5va2Vlbi5jb20iLCJleHAiOjE2MTcxOTkyMDEsInVzZXJfbmFtZSI6IjE1MDE5NDc3MDMyIiwianRpIjoiMjQ3ODhiNTQtMzZmNS00MTkzLTlhMWUtZDJhNmM0Y2I4YzdhIiwiY2xpZW50X2lkIjoiaWRwX3Rlc3RfMTZRNG96Iiwic2NvcGUiOlsiZnV5dW4tZGV2Il19.PzybtrNzpAITSkmMB4uzbWfWuDqfTKb9wg-gHWsyvyMZKn74ZA2zon9-lzeJrQ1uUfeHQYqAMoYMBIoKu9pg55qJB19Lm_l5ii-eKwAMcBzAnlmztMhcnqavxYEkON19140XhiwEZYgTBGfMZRKdxZTsk8pc_j_eCT657W6ONpOFvttzZoqgLKlL2g5UOuq_pJR8cAc3DUKUs0ofScT5n-Hfqqr1v-VRCVWh87XQVid8N22z-NMtXj-tjfjyCzoE8GvDjsA76FBpkxO-USr3pNDfXggIyusyYNbLicQZx_RIbgfDFGn-0kInlx5584va5UILJhpYGW0bDnfxxh-jiA',
//   //日志等级
//   logLevel: 1,
// };

// const HotlineClientUI = window.HotlineClientUI;
const Outbound = () => {
  // const { useClient, HotlineClientUI } = window.HotlineClientUi;
  // const info = useClient(config);
  // console.log(info);
  useEffect(() => {
    // window.renderHotlineClientUI(document.getElementById('out'), config);
  }, []);
  return (
    <div>
      <div id="out" style={{ width: '100%', height: '100px' }}>
        <span>123</span>
      </div>
      <button
        onClick={() => {
          // info.checkIn();
        }}
      >
        checkIn
      </button>
      {/* <HotlineClientUI {...config} /> */}
    </div>
  );
};
export default Outbound;

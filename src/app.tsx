import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/login';
import { notification } from 'antd';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import logo from '@/assets/imgs/logo.png';
import * as qs from 'qs';

const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    logo,
    collapsedButtonRender: false,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

/**
 * 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: ResponseError) => {
  const { response } = error;

  if (response && response.status) {
    const { status } = response;
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${status}`,
      description: errorText,
    });
    if (response.status === 401) {
      const { location } = history;
      const query = {
        redirect: location.pathname,
        ...location.query,
      };
      history.push(`/login?${qs.stringify(query)}`);
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// const authCode = (res: Response) => {
//   if (res && res.status === 200) {
//     res
//       .clone()
//       .json()
//       .then((_res) => {
//         if (_res.code === 401) {
//           const { location } = history;
//           const query = {
//             redirect: location.pathname,
//             ...location.query,
//           };
//           history.push(`/login?${qs.stringify(query)}`);
//         } else if (_res.code !== 200) {
//           message.error(_res.message);
//         }
//       });
//   } else {
//     // message.error('登录授权失败');
//   }
//   return res;
// };

const addAuthHeader = (url: string, options: RequestOptionsInit) => {
  const corpId = sessionStorage.getItem('corpId');
  const agentId = sessionStorage.getItem('agentId');
  const token = sessionStorage.getItem('token');
  const headers = { ...options.headers, corpId, agentId, token };
  return {
    url,
    options: { ...options, headers } as RequestOptionsInit,
  };
};

const addUrlPrefix = (url: string, options: RequestOptionsInit) => {
  const headers = { ...options.headers };
  return {
    // url: `/internal${url}`,
    url,
    options: { ...options, headers },
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [addUrlPrefix, addAuthHeader],
  // responseInterceptors: [authCode],
};

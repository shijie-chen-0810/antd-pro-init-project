import { request } from 'umi';

export const insertStageData = (data: any) => {
  return request<API.BaseRes<boolean>>('/insertStageData', { data, method: 'POST' });
};

export const getStageData = () => {
  return request<API.BaseRes<any>>('/getStageData', { method: 'GET' });
};

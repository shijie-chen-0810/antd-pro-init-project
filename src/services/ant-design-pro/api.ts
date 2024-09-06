import { request } from 'umi';

export const addPoster = (data: any) => {
  return request<API.Result<boolean>>('/fighting/mng/poster/add', { data, method: 'POST' });
};

export const addPosterTemplate = (data: any) => {
  return request<API.Result<boolean>>('/fighting/mng/poster/template/add', {
    data,
    method: 'POST',
  });
};

export const editPoster = (data: any) => {
  return request<API.Result<boolean>>('/fighting/mng/poster/edit', { data, method: 'POST' });
};

export const editPosterTemplate = (data: any) => {
  return request<API.Result<boolean>>('/fighting/mng/poster/template/edit', {
    data,
    method: 'POST',
  });
};
export const queryPoster = (params: any) => {
  return request<
    API.Result<{
      id: number;
      name: string;
      image: string;
      state: number;
      templateType: string;
      templateId: number;
      config: string;
      userInfo: {
        userId: string;
        userName: string;
        userAvatar: string;
        deptId: string[];
        deptName: string[];
      }[];
      userLimit: number;
      createUserName: string;
      createTime: string;
      updateTime: string;
    }>
  >('/fighting/mng/poster/query', { params });
};

export const queryPosterTemplate = (params: any) => {
  return request<
    API.Result<{
      id: number;
      name: string;
      image: string;
      config: string;
      type: string;
      userLimit: number;
      createUserName: string;
      createTime: string;
      updateTime: string;
    }>
  >('/fighting/mng/poster/template/query', { params });
};

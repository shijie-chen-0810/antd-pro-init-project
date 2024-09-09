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
      createUserName: string;
      createTime: string;
      updateTime: string;
    }>
  >('/fighting/mng/poster/template/query', { params });
};

export async function addMaterial(data: any) {
  return request<API.Result<number>>('/fighting/mng/material/add', { data, method: 'POST' });
}

export async function listMaterialTag(params?: any) {
  return request<
    API.Result<
      {
        groupName: string;
        id: number;
        sorted: number;
      }[]
    >
  >('/fighting/mng/material/group', { params });
}

export async function addMaterialTag(tagName: string) {
  return request<API.Result<any>>('/fighting/mng/material/group/add', {
    params: { groupName: tagName },
  });
}

export async function listMaterial(params: any) {
  return request<API.Result<any>>('/fighting/mng/material/list', { params });
}

export async function getMaterialInfo(path: string) {
  return request<API.Result<any>>('/fighting/mng/upload/query/path', { params: { path } });
}

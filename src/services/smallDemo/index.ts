import { request } from 'umi';

export async function queryCustomerDimensionChartData(options: any) {
  // TODO 返回类型设置
  return request('/analysis/customer/dimension', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function uploadFile(data: any) {
  // TODO 返回类型设置
  return request('/profile', {
    method: 'post',
    data,
  });
}

export async function uploadCutFile(data: any) {
  // TODO 返回类型设置
  return request('/uploadCutFile', {
    method: 'post',
    data,
  });
}

export async function mergeCutFile(params: any) {
  // TODO 返回类型设置
  return request('/mergeCutFile', {
    method: 'GET',
    params,
  });
}

export async function verifyFile(params: any) {
  // TODO 返回类型设置
  return request('/verifyFile', {
    method: 'GET',
    params,
  });
}

export async function formatResultService(params: { code: string }) {
  // TODO 返回类型设置
  return request<API.BaseRes<{ info: { status: boolean } }>>('/formatResultService', {
    method: 'GET',
    params,
  });
}

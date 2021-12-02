import { request } from 'umi';

// 核查管理列表
export async function queryTableList(options: any) {
  return request<API.BasePageRes<API.InspectManageListItem>>('/customer/inspect/manage/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}
// 查询核查小二
export async function queryInspectSales() {
  return request<API.BaseRes<API.InspectUser[]>>('/customer/inspect/user/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

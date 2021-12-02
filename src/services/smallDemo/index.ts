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

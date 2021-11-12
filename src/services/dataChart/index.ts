import { request } from 'umi';
// 发送反馈信息
export async function sendFeedback(options?: API.AddFeedbackParam) {
  return request<API.BaseRes<any>>('/customer/issue/save', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

// 图表客户总数
export async function queryAllCustomer(options: any) {
  // TODO 返回类型设置
  return request('/analysis/customer/traded', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function queryTotalInputCustomer(options: any) {
  // TODO 返回类型设置
  return request('/analysis/customer/inputCountForMonth', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function queryInputCustomer(options: any) {
  // TODO 返回类型设置
  return request('/analysis/customer/inputCountForDay', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

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

export async function queryIndustryData(options: any) {
  // TODO 返回类型设置
  return request('/queryIndustryData', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function queryCityLevelData(options: any) {
  // TODO 返回类型设置
  return request('/queryCityLevelData', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function queryCustomerScale(options: any) {
  // TODO 返回类型设置
  return request('/queryCustomerScale', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

export async function queryExampleSource(options: any) {
  // TODO 返回类型设置
  return request('/queryExampleSource', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

// 每日使用人数
export async function queryDayUse(options: any) {
  // TODO 返回类型设置
  return request('/analysis/user/chart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...options,
    },
  });
}

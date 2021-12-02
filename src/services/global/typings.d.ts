// import type { ProFormFieldProps } from '@ant-design/pro-form';

declare namespace API {
  /** 基本返回格式 */
  type BaseRes<T> = {
    code: number;
    message: string;
    result: T;
  };
  type BasePageRes<T> = {
    code: number;
    message: string;
    result: {
      list: T[];
      totals: number;
      pageNo: number;
      pageSize: number;
    };
  };
  type DictItem = {
    label: string;
    value: string | number;
  };
}

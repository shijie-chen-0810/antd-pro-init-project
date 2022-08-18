import { useRequest } from 'ahooks';
import type { Service, Options, Result } from 'ahooks/lib/useRequest/src/types';

function useFormatResultRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  configOption: Options<TData, TParams> & { formatResult: (res: TData) => any },
): Result<TData, TParams> {
  const { formatResult, ...rest } = configOption;
  const { data, ...other } = useRequest(service, rest);
  console.log(data, 'data');
  return {
    data: data && formatResult(data),
    ...other,
  };
}
export default useFormatResultRequest;

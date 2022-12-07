import { useRequest } from 'ahooks';
import type { Service, Options, Result } from 'ahooks/lib/useRequest/src/types';

declare type OptionsWithFormat<TData, TParams extends any[], K extends TData> = {
  formatResult: (res: TData) => K;
} & Options<TData, TParams>;

function useFormatResultRequest<TData, TParams extends any[], K extends TData>(
  service: Service<TData, TParams>,
  configOption: OptionsWithFormat<TData, TParams, K>,
): Result<TData, TParams> {
  const { formatResult, ...rest } = configOption;
  return useRequest(async (...arg: TParams) => {
    const res = await service(...arg);
    return formatResult(res);
  }, rest);
}
export default useFormatResultRequest;

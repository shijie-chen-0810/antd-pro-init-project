import { formatResultService } from '@/services/smallDemo';
// import { useRequest } from 'ahooks-v2';
// import { useRequest } from 'ahooks';
import { Button } from 'antd';
import useFormatResultRequest from './hooks/useFormatResultRequest';

const CustomUseRequest = () => {
  const {
    data: formatResultData,
    loading: formatResultLoading,
    run: runFormatResult,
  } = useFormatResultRequest(formatResultService, {
    manual: true,
    formatResult: (res) => {
      return res.result.info.status;
    },
  });

  return (
    <div>
      <Button onClick={() => runFormatResult({ code: '123' })} loading={formatResultLoading}>
        formatResultEmit
      </Button>
      <span>{formatResultData ? 'true' : 'false'}</span>
    </div>
  );
};
export default CustomUseRequest;

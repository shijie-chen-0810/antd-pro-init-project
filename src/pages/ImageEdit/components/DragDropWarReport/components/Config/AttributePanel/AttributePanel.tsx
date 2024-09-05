import { RootModelState } from '@/models/typing';
import { connect } from 'umi';
import type { Dispatch, ConnectProps } from 'umi';

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
  dispatch: Dispatch<any>;
}

const AttributePanel: React.FC<Props> = () => {
  return <div>AttributePanel</div>;
};
export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(AttributePanel);

import { connect } from 'umi';
import type { ConnectProps } from 'umi';
import style from './Config.less';
import { RootModelState } from '@/models/typing';
import { Tabs } from 'antd';
import type { Tab } from 'rc-tabs/lib/interface';
import StylePanel from './StylePanel';
import AttributePanel from './AttributePanel';

interface Props extends ConnectProps {
  warReport: RootModelState['warReport'];
}

const Config: React.FC<Props> = ({ warReport }) => {
  const { selectId, blockList } = warReport;
  const selectBlock = blockList.find((block) => block.id === selectId);
  const tabsItem: Tab[] = [
    {
      key: 'style',
      label: '样式',
      children: <StylePanel blockInfo={selectBlock} />,
    },
    {
      key: 'attribute',
      label: '属性',
      children: <AttributePanel blockInfo={selectBlock} />,
    },
  ];

  return (
    <div className={style.config}>
      <Tabs items={tabsItem} type="card" />
    </div>
  );
};
export default connect(
  ({ warReport }: RootModelState) => {
    return { warReport };
  },
  (dispatch) => {
    return { dispatch };
  },
)(Config);

import { useLocation } from 'umi';
import SecondPageWrapper from '../SecondPageWrapper';
import { imgList } from '@/utils/varlable';
import { Row, Col } from 'antd';

const MakeWarReport = () => {
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const imgUrl = imgList[imgIndex].url;
  return (
    <SecondPageWrapper>
      <Row>
        <Col span={12} style={{ borderRight: '1px solid #f0f0f0' }}>
          <img src={imgUrl} width={'200px'} />
        </Col>
        <Col span={12}></Col>
      </Row>
    </SecondPageWrapper>
  );
};
export default MakeWarReport;

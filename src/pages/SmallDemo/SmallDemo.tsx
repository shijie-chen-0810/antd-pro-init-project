import { Card, Col, Row, Button, Divider, Space, Form, message } from 'antd';
import type { GlobalState, SmallDemoState, ConnectProps } from 'umi';
import { connect } from 'dva';
import { importsExcel, exportExcel, formatDataForChart } from '@/utils/utils';
import { queryCustomerDimensionChartData, uploadFile } from '@/services/smallDemo';
import ProForm from '@ant-design/pro-form';
import TagPicker from '@/components/TagPicker';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ChartCard from '@/components/ChartCard';
import style from './SmallDemo.less';
import VideoComponent from './demoComponent/VideoComponent';
import PDFOnlineViewer from './demoComponent/PDFOnlineViewer/PDFOnlineViewer';
import SmallRedux from './demoComponent/SmallRedux/SmallRedux';
import FileCutUpload from './demoComponent/FileCutUpload';
import TrackerTest from './demoComponent/TrackerTest';
import CustomUseRequest from './demoComponent/CustomUseRequest';
import RichTextDrawer from './demoComponent/RichTextDrawer';
import Outbound from './demoComponent/Outbound';

interface SmallDemoPageProp extends ConnectProps {
  globalStatus: boolean;
  pageIndex: number;
  changeGlobalStatus: () => void;
  changePageIndex: (step: number) => void;
}

const header = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '用户年龄',
    dataIndex: 'userage',
    key: 'userage',
  },
];

const excelList = [
  {
    id: 1,
    username: 'leson',
    userage: 18,
  },
  {
    id: 2,
    username: 'lulu',
    userage: 30,
  },
  {
    id: 3,
    username: 'beibei',
    userage: 19,
  },
];

const SmallDemo = ({
  globalStatus,
  pageIndex,
  changeGlobalStatus,
  changePageIndex,
}: SmallDemoPageProp) => {
  const [form] = Form.useForm();
  const downloadFileToExcelXLSX = () => {
    exportExcel(header, excelList, '学生信息.xlsx');
  };
  const importExcelToJsonXLSX = (e: File) => {
    importsExcel(e).then(
      function (data: any) {
        const word: any = [
          {
            gameType: 'compass',
            title: '产品类',
            type: 'product',
            words: [],
          },
          {
            gameType: 'compass',
            title: '业务类',
            type: 'bissness',
            words: [],
          },
          {
            gameType: 'compass',
            title: '人员类',
            type: 'people',
            words: [],
          },
          {
            gameType: 'compass',
            title: '公司类',
            type: 'company',
            words: [],
          },
          {
            gameType: 'compass',
            title: '培训类',
            type: 'train',
            words: [],
          },
          {
            gameType: 'compass',
            title: '常见产品类',
            type: 'commonProducts',
            words: [],
          },
          {
            gameType: 'compass',
            title: '文化价值观类',
            type: 'culturalValues',
            words: [],
          },
          {
            gameType: 'compass',
            title: '目标类',
            type: 'target',
            words: [],
          },
          {
            gameType: 'compass',
            title: '经典事件类',
            type: 'classicEvents',
            words: [],
          },
          {
            gameType: 'compass',
            title: '钉钉功能类',
            type: 'ddAbility',
            words: [],
          },
        ];
        data.forEach((item: any) => {
          for (const key in item) {
            word.forEach((type: any) => {
              if (key === type.title) {
                type.words.push(item[key]);
              }
            });
          }
        });
      },
      function (data) {
        console.log(data);
      },
    );
  };
  const uploadImage = async (e: File) => {
    const formData = new FormData();
    formData.append('file', e);
    console.time('total');
    const data = await uploadFile(formData);
    console.timeEnd('total');
    console.log(data);
  };
  return (
    <div className={style['site-card-wrapper']}>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card title="Dva案例" bordered={false}>
            <Row>
              <Col span={6}>{String(globalStatus)}</Col>
              <Col span={12}>
                <Button
                  onClick={() => {
                    changeGlobalStatus();
                  }}
                >
                  change
                </Button>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={6}>{String(pageIndex)}</Col>
              <Col span={12}>
                <Button
                  onClick={() => {
                    changePageIndex(1);
                  }}
                >
                  change
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="自定义表单案例" bordered={false}>
            <ProForm
              className="filter_form"
              onFinish={async (values) => {
                message.success(JSON.stringify(values));
              }}
              form={form}
              submitter={false}
              layout="inline"
            >
              <TagPicker />
              <ProForm.Item className="submit">
                <Space>
                  <Button type="primary" onClick={() => form?.submit()}>
                    确定筛选
                  </Button>
                </Space>
              </ProForm.Item>
            </ProForm>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="外呼" bordered={false}>
            <Outbound />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card title="文件上传" bordered={false}>
            <Space>
              <Upload beforeUpload={uploadImage} showUploadList={false}>
                <Button icon={<UploadOutlined />}>文件上传</Button>
              </Upload>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <FileCutUpload />
        </Col>
        <Col span={8}>
          <RichTextDrawer />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card title="excel导入导出案例" bordered={false}>
            <Space>
              <Button onClick={downloadFileToExcelXLSX}>xlsx导出</Button>
              <Upload beforeUpload={importExcelToJsonXLSX} showUploadList={false} accept=".xlsx">
                <Button icon={<UploadOutlined />}>获取excel信息</Button>
              </Upload>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="埋点组件" bordered={false}>
            <TrackerTest />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="自定义useRequest" bordered={false}>
            <CustomUseRequest />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card title="小型redux" bordered={false}>
            <Space>
              <SmallRedux />
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="视频播放" bordered={false}>
            <VideoComponent />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="PDF在线预览" bordered={false}>
            <PDFOnlineViewer />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <Card title="BizChart图表案例" bordered={false}>
            <ChartCard
              title="客户例子来源分布"
              height={200}
              color={['name', ['#d97459', '#e3c477']]}
              type="interval-dodge"
              rorate={true}
              filter={['day']}
              setParams={{ dayKey: 'time', otherParams: { dimension: 'source' } }}
              queryMethod={queryCustomerDimensionChartData}
              dataFormat={(data: any) => {
                const result = formatDataForChart(data.result, [
                  { name: '已成交', x: 'text', y: 'traded' },
                  { name: '未成交', x: 'text', y: 'notTraded' },
                ]);
                return result;
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({ global, smallDemo }: { global: GlobalState; smallDemo: SmallDemoState }) => {
    return {
      ...global,
      ...smallDemo,
    };
  },
  (dispatch) => {
    return {
      changeGlobalStatus() {
        dispatch({
          type: 'global/changeStatus',
          payload: '123',
        });
      },
      changePageIndex(step: number) {
        dispatch({
          type: 'smallDemo/addPageIndex',
          payload: step,
        });
      },
    };
  },
)(SmallDemo);

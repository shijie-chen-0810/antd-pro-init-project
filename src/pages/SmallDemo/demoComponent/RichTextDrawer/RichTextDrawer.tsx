import RichTextEditor from '@/components/RichTextEditor';
import { Button, Card, Drawer, Form } from 'antd';
import { useState } from 'react';

// const RichTextEditor = import(/** aa*/ '@/components/RichTextEditor');
const RichTextDrawer = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const handleFormSubmit = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <Card title="富文本录入" bordered={false}>
        <Button onClick={() => setDrawerVisible(true)}>打开</Button>
      </Card>
      <Drawer
        destroyOnClose
        open={drawerVisible}
        title="富文本表单"
        width={600}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Button type="primary" onClick={() => form.submit()}>
            提交
          </Button>
        }
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="richText" label="内容">
            <RichTextEditor placeholder="请输入通知内容" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default RichTextDrawer;

import { Form, Input } from 'antd';
import { Modal } from 'antd';
import { useRef } from 'react';

type EnclosureModalProps = {
  visible: boolean;
  setVisible: (value: any) => void;
  successCB?: (value: any) => void;
};

const EnclosureModal: React.FC<EnclosureModalProps> = ({ visible, setVisible, successCB }) => {
  const uploadRef = useRef<any>(null);
  const [form] = Form.useForm();
  const handleComfirm = (values: any) => {
    successCB?.({
      ...values,
      file: values.file[0],
    });
    setVisible(false);
    form.resetFields();
  };
  const handleCancel = () => {
    if (uploadRef.current?.isUploading) {
      Modal.confirm({
        content: '关闭后上传进度不保存',
        onOk: () => {
          uploadRef.current.cancelUpload();
          form.resetFields();
          setVisible(false);
        },
      });
    } else {
      setVisible(false);
      form.resetFields();
    }
  };
  return (
    <Modal width="600px" open={visible} onCancel={handleCancel} onOk={() => form.submit()}>
      <Form form={form} onFinish={handleComfirm}>
        <Form.Item
          labelCol={{ span: 4 }}
          label="附件"
          name="file"
          rules={[{ required: true, message: '请上传附件' }]}
        >
          <Input placeholder="上传组件" />
        </Form.Item>
        <Form.Item labelCol={{ span: 4 }} label="附件名称" name="fileName">
          <Input placeholder="默认为文件名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EnclosureModal;

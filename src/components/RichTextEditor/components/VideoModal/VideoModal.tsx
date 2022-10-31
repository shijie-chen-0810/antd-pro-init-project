import { Form, Input, Modal } from 'antd';
import { useRef } from 'react';

type VideoModalProps = {
  visible: boolean;
  setVisible: (value: any) => void;
  successCB?: (value: any) => void;
};
const VideoModal: React.FC<VideoModalProps> = ({ visible, setVisible, successCB }) => {
  const uploadRef = useRef<any>(null);
  const [form] = Form.useForm();
  const handleComfirm = (values: any) => {
    console.log(values, 'values');
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
    <Modal width="400px" open={visible} onCancel={handleCancel} onOk={() => form.submit()}>
      <Form form={form} onFinish={handleComfirm}>
        <Form.Item
          labelCol={{ span: 4 }}
          label="视频"
          name="file"
          tooltip="目前仅支持MP4,webm格式的视频"
          rules={[{ required: true, message: '请上传视频' }]}
        >
          <Input placeholder="上传组件" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default VideoModal;

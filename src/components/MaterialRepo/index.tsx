import { Modal } from 'antd';

const MaterialRepo: React.FC<{
  visible: boolean;
  visibleChange: (visible: boolean) => void;
  onFinish: (urls: string[]) => void;
}> = ({ visible, visibleChange, onFinish }) => {
  return (
    <Modal
      zIndex={9999}
      className="material"
      style={{ top: 30 }}
      open={visible}
      title="选择图片"
      width={1024}
      onOk={() => {
        onFinish(['//qzz-material.forwe.store/img/fight/a9babd5776bf4b36b83a2c93b3c9d3fc.jpg']);
        visibleChange(false);
      }}
      onCancel={() => visibleChange(false)}
    />
  );
};

export default MaterialRepo;

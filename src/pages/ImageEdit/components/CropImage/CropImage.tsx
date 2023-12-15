import { Button, Row, Col, Space } from 'antd';
import { useLocation } from 'react-router';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { imgList } from '@/utils/varlable';
import style from './CropImage.less';
import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import SecondPageWrapper from '../SecondPageWrapper';

const CropImage = ({}) => {
  const cropRef = useRef<any>(null);
  const cropImageRef = useRef<HTMLImageElement>(null);
  const [cropImage, setCropImage] = useState<any>('');
  const [previewImage, setPreviewImage] = useState<any>('');
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();

  const resetPreviewImage = _.debounce(() => {
    setPreviewImage(
      cropRef.current
        .getCroppedCanvas({
          imageSmoothingQuality: 'high',
        })
        .toDataURL('image/jpeg'),
    );
  }, 100);
  const resetCropImage = () => {
    setCropImage(
      cropRef.current
        .getCroppedCanvas({
          imageSmoothingQuality: 'high',
        })
        .toDataURL('image/jpeg'),
    );
  };
  useEffect(() => {
    cropRef.current = new Cropper(cropImageRef.current as HTMLImageElement, {
      viewMode: 1,
      dragMode: 'none',
      initialAspectRatio: -0.6,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      cropmove() {
        resetPreviewImage();
      },
      ready() {
        resetPreviewImage();
      },
    });
    setCropImage(imgList[imgIndex].url);
  }, []);

  return (
    <SecondPageWrapper>
      <div className={style.main}>
        <div className={style['img-container']}>
          <img src={imgList[imgIndex].url} alt="没有图片" ref={cropImageRef} />
        </div>
        <div className={style['btn-group']}>
          <Space>
            <Button
              type="primary"
              onMouseDown={() => {
                cropRef.current.move(-1, 0);
                resetPreviewImage();
              }}
            >
              <LeftOutlined />
            </Button>
            <Button
              type="primary"
              onMouseDown={() => {
                cropRef.current.move(1, 0);
                resetPreviewImage();
              }}
            >
              <RightOutlined />
            </Button>
            <Button
              type="primary"
              onMouseDown={() => {
                cropRef.current.move(0, -1);
                resetPreviewImage();
              }}
            >
              <UpOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                cropRef.current.move(0, 1);
                resetPreviewImage();
              }}
            >
              <DownOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                cropRef.current.rotate(90);
                resetPreviewImage();
              }}
            >
              向左旋转90
            </Button>
            <Button type="primary" onClick={() => resetCropImage()}>
              裁剪
            </Button>
            <Button
              type="primary"
              onClick={() => {
                cropRef.current.reset();
                resetPreviewImage();
              }}
            >
              重置
            </Button>
          </Space>
        </div>
        <Row style={{ height: '200px' }}>
          <Col span={11}>
            <img style={{ height: '200px', width: '100%' }} src={cropImage} />
          </Col>
          <Col span={11} offset={2}>
            <img style={{ height: '200px', width: '100%' }} src={previewImage} />
          </Col>
        </Row>
      </div>
    </SecondPageWrapper>
  );
};
export default CropImage;

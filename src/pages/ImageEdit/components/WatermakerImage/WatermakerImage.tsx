import { useState } from 'react';
import { Button, Divider, Space, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { imgList } from '@/utils/varlable';
import style from './WatermakerImage.less';
import { Rnd } from 'react-rnd';
import { Input } from 'antd';

type textConfig = {
  text: string;
  color?: string;
  position?: {
    x: number;
    y: number;
  };
};

const WatermakerImage = ({}) => {
  const history = useHistory();
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const [preImage, setPreImage] = useState<any>(imgList[imgIndex].url);
  const [waterText, setWaterText] = useState<string>('编辑添加水印');
  const [waterPosition, setWaterPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const combineImage = (imgUrl: string, { text, color, position }: textConfig) => {
    const getBase64Image = (imgEle: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = imgEle.width;
      canvas.height = imgEle.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(imgEle, 0, 0, canvas.width, canvas.height);
      // @ts-ignore
      ctx.font = '24px solid';
      // @ts-ignore
      ctx.fillStyle = color || 'rgba(0,0,0,0.2)';
      ctx?.fillText(text, position?.x || 10, position?.y || 10);
      const dataURL = canvas.toDataURL();
      return dataURL;
    };
    const image = new Image();
    image.src = imgUrl;
    return new Promise<string>((resolve) => {
      image.onload = () => {
        resolve(getBase64Image(image)); //将base64传给done上传处理
      };
    });
  };

  const handleCombine = async () => {
    const base64 = await combineImage(imgList[imgIndex].url, {
      text: waterText,
      color: 'rgba(0,0,0,0.6)',
      position: waterPosition,
    });
    setPreImage(base64);
  };

  return (
    <div className={style.container}>
      <Button onClick={() => history.go(-1)} type="link">
        <LeftOutlined />
        返回
      </Button>
      <Divider style={{ margin: '5px 0 20px' }} />
      <div className={style.main}>
        <div className={style['img-container']} style={{ height: '250px' }}>
          <img style={{ height: '100%' }} src={imgList[imgIndex].url} alt="没有图片" />
          <Rnd
            bounds="parent"
            enableResizing={{
              right: true,
            }}
            className={style['water-text']}
            minWidth={20}
            default={{
              x: 0,
              y: 0,
              width: 175,
              height: 50,
            }}
            onDragStop={(e, { lastX, lastY }) => {
              setWaterPosition({ x: lastX, y: lastY });
            }}
          >
            <Input
              value={waterText}
              style={{ fontSize: '24px', color: 'rgba(0,0,0,0.6)' }}
              bordered={false}
              onChange={(e) => {
                e.stopPropagation();
                setWaterText(e.target.value);
              }}
            />
          </Rnd>
        </div>
        <div className={style['btn-group']}>
          <Space>
            <Button type="primary" onClick={() => handleCombine()}>
              合并
            </Button>
          </Space>
        </div>
        <Row>
          <Col span={12} style={{ height: '250px' }}>
            <img style={{ height: '100%' }} src={preImage} />
          </Col>
          <Col span={11} offset={2}>
            {/* <img style={{ height: '200px', width: '100%' }} src={preImage} /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default WatermakerImage;

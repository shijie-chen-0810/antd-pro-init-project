import React, { useState } from 'react';
import { Card, Button, Space } from 'antd';
import { useHistory } from 'react-router';
import { imgList } from '@/utils/varlable';

const gridStyle = {
  width: '25%',
  height: '150px',
};

const ImageCrop: React.FC = () => {
  const history = useHistory();
  const [cropImage, setCropImage] = useState<number>(0);

  return (
    <>
      <Card title="图片处理">
        {imgList.map((img: any, index: number) => {
          return (
            <Card.Grid key={img.id} style={gridStyle}>
              <div
                onClick={() => setCropImage(index)}
                style={{
                  outline: cropImage === index ? '1px dashed red' : '',
                }}
              >
                <img style={{ height: '100px', width: '100%' }} src={img.url} />
              </div>
            </Card.Grid>
          );
        })}
      </Card>
      <Space style={{ marginTop: '10px' }}>
        <Button
          type="primary"
          onClick={() =>
            history.push({ pathname: '/imageEdit/crop', state: { imgIndex: cropImage } })
          }
        >
          去处理
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({ pathname: '/imageEdit/watermaker', state: { imgIndex: cropImage } })
          }
        >
          去添加
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/imageEdit/editImageWithKonva',
              state: { imgIndex: cropImage },
            })
          }
        >
          Konva处理
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/imageEdit/makeWarReport',
              state: { imgIndex: cropImage },
            })
          }
        >
          做战报
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/imageEdit/makeWarReportTwo',
              state: { imgIndex: cropImage },
            })
          }
        >
          做战报2.0
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/imageEdit/dragDropWarReport',
              state: { imgIndex: cropImage },
            })
          }
        >
          拖拽战报
        </Button>
        <Button
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/imageEdit/editor',
              state: { imgIndex: cropImage },
            })
          }
        >
          拖拽战报2.0
        </Button>
      </Space>
    </>
  );
};
export default ImageCrop;

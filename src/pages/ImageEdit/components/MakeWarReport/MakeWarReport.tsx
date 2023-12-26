import { useLocation } from 'umi';
import SecondPageWrapper from '../SecondPageWrapper';
import { imgList } from '@/utils/varlable';
import { Row, Col, Button, Input } from 'antd';
import { useState } from 'react';
import ProForm, { ProFormDigit, ProFormList, ProFormText } from '@ant-design/pro-form';

type TextConfig = {
  text: string;
  color?: string;
  size?: number;
  x: number;
  y: number;
  width: number;
  fontSize: number;
};

CanvasRenderingContext2D.prototype.wrapText = function (
  text: string,
  x: number,
  y: number,
  maxWidth = 100,
  fontSize = 24,
) {
  // 字符分隔为数组
  const arrText = text.split('');
  let yy = y;
  let line = '';

  for (let n = 0; n < arrText.length; n++) {
    const testLine = line + arrText[n];
    const metrics = this.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      this.fillText(line, x, yy);
      line = arrText[n];
      yy += fontSize;
    } else {
      line = testLine;
    }
  }
  this.fillText(line, x, yy);
};

const MakeWarReport = () => {
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const imgUrl = imgList[imgIndex].url;
  const [mergeImage, setMergeImage] = useState<any>(imgUrl);
  const [form] = ProForm.useForm();

  const combineImage = (imgsrc: string, payload: TextConfig[]) => {
    const getBase64Image = (imgEle: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = imgEle.width;
      canvas.height = imgEle.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(imgEle, 0, 0, canvas.width, canvas.height);
      payload.forEach((info) => {
        const { width, fontSize, x, y, color, text } = info;
        ctx.font = `${fontSize}px solid`;
        const initTextWidth = Math.floor(ctx.measureText(text).width);
        // 单行的时候不缩放
        if (initTextWidth <= width) {
          ctx.font = `${fontSize}px solid`;
          ctx.fillStyle = color || 'rgba(0,0,0,0.2)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.wrapText(text, x + width / 2, y, width, fontSize);
        }
        // 单行的时候缩放
        if (initTextWidth > width && initTextWidth < width * 1.5) {
          console.log(text, 'tt');
          ctx.font = `${Math.ceil(width / text.length)}px solid`;
          ctx.fillStyle = color || 'rgba(0,0,0,0.2)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(text, x + width / 2, y, width);
        }
        // 两行的时候不省略
        if (initTextWidth > width * 1.5 && initTextWidth <= width * 3) {
          ctx.font = `${Math.floor(fontSize / 1.5)}px solid`;
          ctx.fillStyle = color || 'rgba(0,0,0,0.2)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.wrapText(text, x + width / 2, y, width, fontSize / 1.5);
        }
        // 两行的时候省略
        if (initTextWidth > width * 3) {
          ctx.font = `${Math.floor(fontSize / 1.5)}px solid`;
          ctx.fillStyle = color || 'rgba(0,0,0,0.2)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          const maxTextLength = (width / (fontSize / 1.5)) * 2;
          const _text = text.slice(0, maxTextLength - 2) + '...';
          ctx.wrapText(_text, x + width / 2, y, width, fontSize / 1.5);
        }
      });

      const dataURL = canvas.toDataURL();
      return dataURL;
    };
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imgsrc;
    return new Promise<string>((resolve) => {
      image.onload = () => {
        resolve(getBase64Image(image)); //将base64传给done上传处理
      };
    });
  };

  const handleCombine = async () => {
    const values = form.getFieldsValue();
    const base64 = await combineImage(imgList[imgIndex].url, values.users);
    setMergeImage(base64);
  };

  return (
    <SecondPageWrapper>
      <Row style={{ padding: '0 10px' }}>
        <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }}>
          <img width={'250px'} style={{ marginLeft: '10px' }} src={mergeImage} />
        </Col>
        <Col span={16} style={{ paddingLeft: '10px' }}>
          <ProForm
            form={form}
            onFinish={handleCombine}
            autoComplete="off"
            layout="horizontal"
            submitter={false}
            initialValues={{
              users: [
                {
                  x: 50,
                  y: 200,
                  color: '#edd9b6',
                  width: 250,
                  fontSize: 48,
                  text: '广西崇左市国盈投资管理有限责任公司',
                },
                {
                  x: 50,
                  y: 250,
                  color: '#edd9b6',
                  width: 250,
                  fontSize: 36,
                  text: '建筑|20人|年产值：3000万',
                },
                {
                  x: 50,
                  y: 450,
                  color: '#edd9b6',
                  width: 250,
                  fontSize: 36,
                  text: '数字化管理师(2人)',
                },
                {
                  x: 50,
                  y: 490,
                  color: '#edd9b6',
                  width: 250,
                  fontSize: 72,
                  text: '9800',
                },
                {
                  x: 50,
                  y: 580,
                  color: '#edd9b6',
                  width: 250,
                  fontSize: 24,
                  text: '池昊 远程一军',
                },
              ],
            }}
            onChange={handleCombine}
          >
            <ProFormList name="users" actionRender={(field, action, actionDom) => [actionDom[1]]}>
              {() => (
                <Row gutter={12}>
                  <Col span={8}>
                    <ProFormDigit label="X" name={'x'} />
                  </Col>
                  <Col span={8}>
                    <ProFormDigit label="Y" name={'y'} />
                  </Col>
                  <Col span={8}>
                    <ProForm.Item label="Color" name={'color'}>
                      <Input type="color" />
                    </ProForm.Item>
                  </Col>
                  <Col span={8}>
                    <ProFormDigit label="width" name={'width'} />
                  </Col>
                  <Col span={8}>
                    <ProFormDigit label="fontSize" name={'fontSize'} />
                  </Col>
                  <Col span={8}>
                    <ProFormText label="Text" name={'text'} />
                  </Col>
                </Row>
              )}
            </ProFormList>
          </ProForm>
          <Button type="primary" onClick={form?.submit}>
            生成
          </Button>
        </Col>
      </Row>
    </SecondPageWrapper>
  );
};
export default MakeWarReport;

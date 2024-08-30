import { useLocation } from 'umi';
import SecondPageWrapper from '../SecondPageWrapper';
import { imgList } from '@/utils/varlable';
import style from './MakeWarReportTwo.less';
import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { cloneDeep, throttle } from 'lodash';
import cs from 'classnames';
import { CloseOutlined } from '@ant-design/icons';

type BlockInfo = {
  id: number;
  blockType: 'text' | 'img';
  width: number;
  height: number;
  position: { x: number; y: number };
  text?: string;
  fontSize?: number;
  status?: 'edit' | 'view';
  src?: string;
  color?: string;
};

const MakeWarReportTwo = () => {
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const imgUrl = imgList[imgIndex].url;
  const [blockInfo, setBlockInfo] = useState<BlockInfo[]>();
  const [preImage, setPreImage] = useState<string>();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [addForm] = ProForm.useForm();
  const blockType = ProForm.useWatch('blockType', addForm);

  const handleAddBlock = () => {
    setAddModalOpen(true);
  };
  const handleDeleteBlock = (id: number) => {
    setBlockInfo(blockInfo?.filter((block) => block.id !== id));
  };

  const combineImage = async (imgUrl: string, blockInfo?: BlockInfo[]) => {
    const dpr = window.devicePixelRatio;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imgUrl;
    // 画底图
    await new Promise<boolean>((resolve) => {
      image.onload = async () => {
        canvas.width = 250 * dpr;
        canvas.height = ((250 * image.height) / image.width) * dpr;
        canvas.style.width = '250px';
        canvas.style.height = (250 * image.height) / image.width + 'px';
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(true);
      };
    });
    const imgPromiseArr: Promise<any>[] = [];
    // 画整合块
    blockInfo?.forEach((block) => {
      const { blockType, color = 'black', text = '', fontSize = 12, position, src = '' } = block;
      const { x = 0, y = 0 } = position;
      // 画文字
      if (blockType === 'text') {
        // @ts-ignore
        ctx.font = `${fontSize * dpr}px solid`;
        // @ts-ignore
        ctx.fillStyle = color;
        // @ts-ignore
        ctx.textBaseline = 'bottom';
        ctx?.fillText(text, x * dpr, (y + fontSize) * dpr);
      }
      // 画图片
      if (blockType === 'img') {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = src;
        imgPromiseArr.push(
          new Promise((resolve, reject) => {
            image.onload = () => {
              const dpr = window.devicePixelRatio;
              const { position, width, height } = block;
              const { x = 0, y = 0 } = position;
              let imgWidth = 0;
              let imgHeight = 0;
              if (image.width / image.height - width / height > 0) {
                imgWidth = width * dpr;
                imgHeight = ((width * image.height) / image.width) * dpr;
              } else {
                imgHeight = height * dpr;
                imgWidth = ((height * image.width) / image.height) * dpr;
              }
              ctx?.drawImage(image, x * dpr, y * dpr, imgWidth, imgHeight);
              resolve(true);
            };
          }),
        );
      }
    });
    await Promise.all(imgPromiseArr);
    const dataURL = canvas.toDataURL();
    return dataURL;
  };

  const handlePreview = async () => {
    // const targetOrigin = document.querySelector('#targetOrigin') as HTMLElement;
    // if (targetOrigin) {
    //   const canvas = await html2canvas(targetOrigin, { useCORS: true, allowTaint: true });
    //   setPreImage(canvas.toDataURL());
    // }
    const base64 = await combineImage(imgUrl, blockInfo);
    setPreImage(base64);
    setPreviewModalOpen(true);
  };

  const addFormFinish = async (values: any) => {
    let originBlockInfo: BlockInfo;
    if (values.blockType === 'text') {
      originBlockInfo = {
        id: new Date().getTime(),
        blockType: 'text',
        width: 100,
        height: 24,
        fontSize: 24,
        status: 'view',
        position: { x: 0, y: 0 },
        ...values,
      };
    } else {
      originBlockInfo = {
        id: new Date().getTime(),
        blockType: 'img',
        width: 100,
        height: 100,
        position: { x: 0, y: 0 },
        ...values,
      };
    }

    if (blockInfo) {
      setBlockInfo([...blockInfo, { ...originBlockInfo, id: new Date().getTime() }]);
    } else {
      setBlockInfo([originBlockInfo]);
    }
    setAddModalOpen(false);
  };

  const changeBlockItemInfo = (id: number, changeInfo: Partial<BlockInfo>) => {
    let targetBlock = cloneDeep(blockInfo?.find((block) => block.id === id));
    targetBlock = {
      ...targetBlock,
      ...changeInfo,
    } as BlockInfo;
    const newBLockInfo = blockInfo?.map((block) => {
      if (block.id === targetBlock?.id) {
        return targetBlock;
      } else {
        return block;
      }
    });
    setBlockInfo(newBLockInfo);
  };

  return (
    <SecondPageWrapper>
      <div className={style.container}>
        <div className={style['toolbar-container']}>
          <span className={style['toolbar-container-item']} onClick={handleAddBlock}>
            +
          </span>
        </div>
        <div className={style['content-container']}>
          <div className={style['content-img']} id="targetOrigin">
            <img src={imgUrl} width={'250px'} draggable={false} />
            {blockInfo?.map((block) => {
              const { id, blockType, width, height, color, text, fontSize, src, status, position } =
                block;
              const { x = 0, y = 0 } = position;
              let blockStyle = {};
              if (blockType === 'text') {
                blockStyle = {
                  color,
                  fontSize: `${fontSize}px`,
                  lineHeight: `${fontSize}px`,
                };
              }
              if (blockType === 'img') {
                blockStyle = {
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                };
              }
              return (
                <Rnd
                  key={id}
                  bounds="parent"
                  enableResizing={{ right: true, bottom: true, bottomRight: true }}
                  onResize={throttle((e, a, ele) => {
                    const { clientWidth: width, clientHeight: height } = ele;
                    changeBlockItemInfo(id, { width, height, fontSize: height });
                  }, 100)}
                  className={cs(style['water-text'], 'one_line')}
                  default={{ x, y, width, height }}
                  style={{ ...blockStyle }}
                  onDragStop={(e, { x, y }) => changeBlockItemInfo(id, { position: { x, y } })}
                  onMouseEnter={() => {
                    blockType === 'text' && changeBlockItemInfo(id, { status: 'edit' });
                  }}
                  onMouseLeave={() => {
                    blockType === 'text' && changeBlockItemInfo(id, { status: 'view' });
                  }}
                >
                  {blockType === 'text' ? (
                    status === 'view' ? (
                      text
                    ) : (
                      <Input
                        className={style['input-style']}
                        style={{ fontSize, color, width, height }}
                        value={text}
                        onChange={(e) => changeBlockItemInfo(id, { text: e.target.value })}
                      />
                    )
                  ) : null}
                  <CloseOutlined
                    className={style['delete-btn']}
                    onClick={() => handleDeleteBlock(id)}
                  />
                </Rnd>
              );
            })}
          </div>
        </div>
        <div className={style['btn-container']}>
          <Button size="small" type="primary" onClick={handlePreview}>
            预览
          </Button>
        </div>
      </div>
      <Modal
        title="新建"
        open={addModalOpen}
        onOk={addForm.submit}
        afterClose={addForm.resetFields}
        onCancel={() => {
          setAddModalOpen(false);
        }}
      >
        <ProForm layout="horizontal" submitter={false} form={addForm} onFinish={addFormFinish}>
          <ProFormSelect
            label="类型"
            name="blockType"
            valueEnum={{ img: '图片', text: '文字' }}
            rules={[{ required: true, message: '请输入类型' }]}
          />
          {blockType === 'img' ? (
            <ProFormText
              label="图片地址"
              name="src"
              initialValue={
                'https://notice-log-test.oss-cn-hangzhou.aliyuncs.com/battle/battle-dev/image/ding76745342e411bc8dbc961a6cb783455b/202104/1619167373574%E5%9B%BE%E6%80%AA%E5%85%BD_%E6%88%98%E6%8A%A57.jpg'
              }
              rules={[{ required: true, message: '请输入图片地址' }]}
            />
          ) : (
            <>
              <ProFormText
                label="文案"
                name="text"
                rules={[{ required: true, message: '请输入文案' }]}
              />
              <ProForm.Item
                label="颜色"
                name="color"
                rules={[{ required: true, message: '请选择颜色' }]}
              >
                <Input type="color" />
              </ProForm.Item>
            </>
          )}
        </ProForm>
      </Modal>
      <Modal
        width={295}
        bodyStyle={{ width: '295px' }}
        footer={null}
        open={previewModalOpen}
        onCancel={() => setPreviewModalOpen(false)}
      >
        <img src={preImage} draggable={false} style={{ width: '250px' }} />
      </Modal>
    </SecondPageWrapper>
  );
};
export default MakeWarReportTwo;

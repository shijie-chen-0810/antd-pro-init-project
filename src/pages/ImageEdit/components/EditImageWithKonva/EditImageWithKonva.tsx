import { message, Radio, Slider } from 'antd';
import { v4 as uuid } from 'uuid';
import type { RadioChangeEvent } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { useLocation } from 'umi';
import { imgList } from '@/utils/varlable';
import style from './EditImageWithKonva.less';
import { useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { Layer } from 'konva/lib/Layer';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Circle } from 'konva/lib/shapes/Circle';
import type { Rect } from 'konva/lib/shapes/Rect';
import type { Transformer } from 'konva/lib/shapes/Transformer';
import _ from 'lodash';
import SecondPageWrapper from '../SecondPageWrapper';

enum OprationArr {
  insertImage = 'INSERTIMAGE',
  drawCircle = 'DRAWCIRCLE',
  chooseNode = 'CHOOSENODE',
}
const marks: SliderMarks = {
  '-1': '暗',
  1: {
    label: '亮',
    style: { color: 'black' },
  },
};

const uuidArr: string[] = [];

const EditImageWithKonva = () => {
  const {
    state: { imgIndex },
  } = useLocation<{ imgIndex: number }>();
  const [curOpration, setCurOpration] = useState<OprationArr>();
  const [konvaStage, setKonvaState] = useState<Stage>();
  const [konvaLayer, setKonvaLayer] = useState<Layer>();
  const [curShape, setCurShape] = useState<any>();
  const konvaCircleMenuRef = useRef<HTMLDivElement>(null);
  const imgUrl = imgList[imgIndex].url;

  const initKonva = () => {
    const stage = new Konva.Stage({
      container: 'konva-canvas',
      width: 500,
      height: 500,
    });
    const layer = new Konva.Layer();
    layer.on('wheel', (wheelEvent: KonvaEventObject<WheelEvent>) => {
      const deltaY = -wheelEvent.evt.deltaY;
      const originScaleX = layer.scaleX();
      layer.scale({
        x: deltaY / 1000 + originScaleX,
        y: deltaY / 1000 + originScaleX,
      });
      layer.batchDraw();
    });
    layer.on('click', (e) => {
      e.evt.preventDefault();
      if (konvaCircleMenuRef.current) {
        konvaCircleMenuRef.current.style.display = 'none';
      }
    });
    stage.add(layer);
    setKonvaLayer(layer);
    setKonvaState(stage);
  };

  const drawCircle = useCallback(
    (startX: number, startY: number, endX: number, endY: number, circle: Circle) => {
      const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      circle.x((endX - startX) / 2 + startX);
      circle.y((endY - startY) / 2 + startY);
      circle.radius(radius / 2);
      konvaLayer?.draw();
    },
    [konvaLayer],
  );
  const changeImageBright = useCallback(
    (value: number) => {
      const konvaImage = konvaLayer?.find('#self-image')[0];
      konvaImage?.brightness(value);
      konvaLayer?.batchDraw();
    },
    [konvaLayer],
  );

  const handleInsertImage = useCallback(() => {
    if (konvaLayer?.find('#self-image')[0]) {
      konvaLayer?.off('mousedown');
      konvaLayer?.off('mousemove');
      konvaLayer?.off('mouseup');
      konvaLayer?.off('mouseleave');
      message.warning('图片已插入');
    } else {
      const imageEle = new Image();
      imageEle.onload = () => {
        let { width: originWidth, height: originHeight } = imageEle;
        if (originWidth > 500) {
          originHeight = (500 * originHeight) / originWidth;
          originWidth = 500;
        }
        const yoda = new Konva.Image({
          x: 0,
          y: 0,
          image: imageEle,
          width: originWidth,
          height: originHeight,
          brightness: 0,
          id: 'self-image',
        });
        yoda.cache();
        yoda.filters([Konva.Filters.Brighten]);
        konvaLayer?.add(yoda);
        konvaLayer?.batchDraw();
      };
      imageEle.src = imgUrl;
    }
  }, [imgUrl, konvaLayer]);
  const handleDrawCircle = useCallback(() => {
    konvaLayer?.off('mousedown');
    konvaLayer?.off('mousemove');
    konvaLayer?.off('mouseup');
    konvaLayer?.off('mouseleave');
    let konvaCircle: Circle;
    let isDrawing: boolean = false;
    konvaLayer?.on('mousedown', (e: KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      if (e.target.className === 'Image') {
        isDrawing = true;
        const scale = konvaLayer.scaleX();
        let { offsetX, offsetY } = e.evt;
        offsetX = offsetX / scale;
        offsetY = offsetY / scale;
        const circleUuId = uuid();
        uuidArr.push(circleUuId);
        konvaCircle = new Konva.Circle({
          x: offsetX,
          y: offsetY,
          radius: 0,
          stroke: 'black',
          strokeWidth: 1,
          id: circleUuId,
          draggable: true,
          state: { id: circleUuId },
        });
        // konvaCircle.on('click', (clickEvent: KonvaEventObject<MouseEvent>) => {
        //   clickEvent.evt.preventDefault();
        //   console.log(clickEvent, 'click');
        // });
        konvaCircle.on('contextmenu', (contextmenuEvent: KonvaEventObject<MouseEvent>) => {
          contextmenuEvent.evt.preventDefault();
          const { offsetX: contextmenuOffsetX, offsetY: contextmenuOffsetY } = contextmenuEvent.evt;
          if (konvaCircleMenuRef.current) {
            setCurShape(contextmenuEvent.target);
            konvaCircleMenuRef.current.style.display = 'block';
            konvaCircleMenuRef.current.style.left = `${contextmenuOffsetX + 4}px`;
            konvaCircleMenuRef.current.style.top = `${contextmenuOffsetY + 4}px`;
          }
        });
        konvaLayer.add(konvaCircle);
        konvaLayer.on(
          'mousemove',
          _.throttle((moveEvent: KonvaEventObject<MouseEvent>) => {
            moveEvent.evt.preventDefault();
            let { offsetX: moveOffsetX, offsetY: moveOffsetY } = moveEvent.evt;
            moveOffsetX = moveOffsetX / scale;
            moveOffsetY = moveOffsetY / scale;
            drawCircle(offsetX, offsetY, moveOffsetX, moveOffsetY, konvaCircle);
          }, 50),
        );
        konvaLayer.on('mouseleave', (leaveEvent: KonvaEventObject<MouseEvent>) => {
          leaveEvent.evt.preventDefault();
          const { offsetX: leaveOffsetX, offsetY: leaveOffsetY } = leaveEvent.evt;
          if (isDrawing) {
            drawCircle(offsetX, offsetY, leaveOffsetX, leaveOffsetY, konvaCircle);
          }
          isDrawing = false;
          konvaLayer.off('mousemove');
        });
      }
    });
    konvaLayer?.on('mouseup', (e: KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      isDrawing = false;
      konvaLayer.off('mousemove');
    });
  }, [drawCircle, konvaLayer]);
  const handleChooseNode = useCallback(() => {
    konvaLayer?.off('mousedown');
    konvaLayer?.off('mousemove');
    konvaLayer?.off('mouseup');
    konvaLayer?.off('mouseleave');
    let rect: Rect;
    let transformer: Transformer | null;
    konvaLayer?.on('mousedown', (downEvent: KonvaEventObject<MouseEvent>) => {
      downEvent.evt.preventDefault();
      if (downEvent.target.className === 'Image') {
        transformer?.nodes([]);
        transformer = null;
        konvaLayer.removeName('transformer');
        const scale = konvaLayer.scaleX();
        let { offsetX, offsetY } = downEvent.evt;
        offsetX = offsetX / scale;
        offsetY = offsetY / scale;
        rect = new Konva.Rect({
          x: offsetX,
          y: offsetY,
          dash: [10, 5],
          stroke: 'black',
          strokeWidth: 1,
        });
        konvaLayer.add(rect);
        konvaLayer.on('mousemove', (moveEvent: KonvaEventObject<MouseEvent>) => {
          moveEvent.evt.preventDefault();
          let { offsetX: moveOffsetX, offsetY: moveOffsetY } = moveEvent.evt;
          moveOffsetX = moveOffsetX / scale;
          moveOffsetY = moveOffsetY / scale;
          rect.width(moveOffsetX - offsetX);
          rect.height(moveOffsetY - offsetY);
          konvaLayer.draw();
        });
        konvaLayer.on('mouseleave', (leaveEvent: KonvaEventObject<MouseEvent>) => {
          leaveEvent.evt.preventDefault();
          rect.destroy();
          konvaLayer.off('mousemove');
        });
      }
    });
    konvaLayer?.on('mouseup', (e: KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      const circles = konvaStage?.find('Circle');
      const selectShape = circles?.filter((circle) => {
        return Konva.Util.haveIntersection(rect.getClientRect(), circle.getClientRect());
      });
      if (selectShape?.length && !transformer) {
        transformer = new Konva.Transformer({
          id: 'transformer',
          name: 'transformer',
          keepRatio: true,
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          rotateEnabled: false,
        });
        transformer.nodes(selectShape);
        konvaLayer.add(transformer);
      }
      selectShape?.forEach((shape) => {
        shape.setAttr('stroke', 'red');
      });
      rect?.destroy();
      konvaLayer.off('mousemove');
    });
  }, [konvaLayer, konvaStage]);

  const showCircleId = useCallback(() => {
    const { attrs } = curShape || {};
    message.info(attrs?.id);
    if (konvaCircleMenuRef.current) {
      konvaCircleMenuRef.current.style.display = 'none';
    }
  }, [curShape]);
  const deleteCircle = useCallback(() => {
    curShape?.destroy();
    if (konvaCircleMenuRef.current) {
      konvaCircleMenuRef.current.style.display = 'none';
    }
  }, [curShape]);

  const handleOprate = useCallback(
    (e: RadioChangeEvent) => {
      setCurOpration(e.target.value);
      const transformers = konvaLayer?.find('Transformer') as Transformer[];
      transformers?.forEach((item) => item?.nodes([]));
      konvaLayer?.removeName('transformer');
      switch (e.target.value) {
        case OprationArr.insertImage:
          handleInsertImage();
          break;
        case OprationArr.drawCircle:
          handleDrawCircle();
          break;
        case OprationArr.chooseNode:
          handleChooseNode();
          break;
      }
    },
    [handleInsertImage, handleDrawCircle, handleChooseNode, konvaLayer],
  );
  useEffect(() => {
    initKonva();
  }, []);
  return (
    <SecondPageWrapper>
      <Slider
        style={{
          margin: '0 auto 28px',
          width: 500,
        }}
        defaultValue={0}
        marks={marks}
        min={-1}
        max={1}
        onChange={changeImageBright}
        step={0.01}
      />
      <div className={style.main}>
        <div id="konva-canvas" />
        <div ref={konvaCircleMenuRef} className={style['konva-circle-menu']}>
          <div onClick={() => showCircleId()}>showID</div>
          <div onClick={() => deleteCircle()}>delete</div>
        </div>
        <div className={style.btns}>
          <Radio.Group className={style['konva-btns']} value={curOpration} onChange={handleOprate}>
            <Radio.Button value={OprationArr.insertImage}>插入图片</Radio.Button>
            <Radio.Button value={OprationArr.drawCircle}>画圈</Radio.Button>
            <Radio.Button value={OprationArr.chooseNode}>选择</Radio.Button>
          </Radio.Group>
          {/* <Space className={style['opration-btn']}>
              <Button onClick={handleUndo}>
                <UndoOutlined />
              </Button>
              <Button onClick={handleRedo}>
                <RedoOutlined />
              </Button>
            </Space> */}
        </div>
      </div>
    </SecondPageWrapper>
  );
};
export default EditImageWithKonva;

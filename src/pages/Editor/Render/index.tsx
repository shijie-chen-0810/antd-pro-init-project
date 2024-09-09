/*
 * Render.tsx
 * Created by 还有醋v on 2022/4/20.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { DeleteOutlined } from '@ant-design/icons';
import type { Group, Node } from './Engine';
import { Stage, Text, Image, getClass } from './Engine';
import { Figure } from './Engine';
import { covertSVGToImage, getImage } from './renderTools';
import _ from 'lodash';
import { Component } from 'react';
import type {
  DraggableProps,
  MoveableManagerInterface,
  Renderer,
  ResizableProps,
  ScalableProps,
  RotatableProps,
} from 'react-moveable';
import { Draggable, makeMoveable, Scalable, Rotatable } from 'react-moveable';

import styles from './index.less';
import MaterialRepo from '@/components/MaterialRepo';

type RenderProps = {
  width: number;
  height: number;
  bgSrc: string;
  onSelect: (node: Node<any> | null | undefined) => void;
  onUpdate: () => void;
  template: boolean;
  zoom: number;
};

// import testImg from './test.png';

const Moveable = makeMoveable<DraggableProps & ResizableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
  Rotatable,
]);

const Editable = {
  name: 'editable',
  props: [],
  events: [],
  render: (moveable: MoveableManagerInterface<any, any>, React: Renderer) => {
    const { pos2 } = moveable.state;
    const { dimensionViewable } = moveable.props;
    const rect = moveable.getRect();
    return (
      <div key="editable-viewer">
        <div
          key="editable-viewer"
          className="moveable-editable"
          style={{
            position: 'absolute',
            left: '5px',
            top: '0px',
            willChange: 'transform',
            fontSize: '10px',
            transformOrigin: '0 0',
            transform: `translate(${pos2[0]}px, ${pos2[1]}px)`,
          }}
        >
          <button
            className="moveable-button"
            style={{
              width: '65px',
              background: '#4af',
              borderRadius: '4px',
              appearance: 'none',
              border: 0,
              color: 'white',
              fontWeight: 'bold',
            }}
            onClick={() => {
              moveable.props.onMoveUp();
            }}
          >
            图层上移
          </button>
          <button
            className="moveable-button"
            style={{
              width: '65px',
              marginTop: '5px',
              background: '#4af',
              borderRadius: '4px',
              appearance: 'none',
              border: 0,
              color: 'white',
              fontWeight: 'bold',
            }}
            onClick={() => {
              moveable.props.onMoveDown();
            }}
          >
            图层下移
          </button>
          <button
            className="del"
            style={{
              position: 'absolute',
              left: 0,
              top: '-35px',
              background: 'red',
              borderRadius: '4px',
              appearance: 'none',
              border: 0,
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
            onClick={() => {
              moveable.props.onDeleteNode();
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
        {dimensionViewable ? (
          <div
            key="dimension-viewer"
            className="moveable-dimension"
            style={{
              position: 'absolute',
              left: `${rect.width / 2}px`,
              top: `${rect.height + 5}px`,
              background: '#4af',
              borderRadius: '2px',
              padding: '2px 4px',
              color: 'white',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              willChange: 'transform',
              transform: 'translate(-50%, 0px)',
            }}
          >
            双击编辑
          </div>
        ) : null}
      </div>
    );
  },
};

// TODO 为什么用class组件？主要是函数式组件生命周期不明确，手动操作dom不方便，我太菜了
export default class Render extends Component<RenderProps> {
  scale: number = 1;
  stage: Stage | undefined;
  renderCmp: HTMLDivElement | undefined;
  renderBox: HTMLDivElement | undefined;
  renderStage: HTMLDivElement | undefined;
  selectNode: Node<any> | null | undefined = null;
  private moveable: any;

  state = {
    isText: false,
    keepRatio: false,
    target: null,
    visible: false,
    node: null,
    frame: {
      translate: [0, 0],
      scale: [1, 1],
    },
  };

  componentDidMount() {
    // react的事件居然是默认passive=true?
    this.renderCmp!.addEventListener('wheel', this.onWheel, { passive: false });

    const stage = (this.stage = new Stage(this.props.width, this.props.height));
    this.stage.bgSrc = this.props.bgSrc;
    stage.dom && this.renderStage?.appendChild(stage.dom);
    // if (this.props.template) {
    //   const text = new Text('由蒲公英提供技术支持');
    //   this.stage.add(text);
    // }
    this.scale = this.props.zoom;

    this.stage.dom?.addEventListener('mousedown', this.onStageMouseDown);
    window.addEventListener('resize', this.onWinResize);
    setTimeout(() => {
      // const sx = this.renderCmp.clientWidth / this.props.width;
      // const sy = this.renderCmp.clientHeight / this.props.height;
      // this.scale = Math.min(sx, sy);
      this.setScale();
    }, 50);
  }

  componentWillUnmount() {
    this.renderCmp!.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.onWinResize);
  }

  componentDidUpdate(prevProps: Readonly<RenderProps>) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      prevProps.bgSrc !== this.props.bgSrc
    ) {
      setTimeout(() => {
        // const sx = this.renderCmp.clientWidth / this.props.width;
        // const sy = this.renderCmp.clientHeight / this.props.height;
        // this.scale = Math.min(sx, sy);
        this.setScale();
      }, 100);
      if (this.stage) {
        this.stage.width = this.props.width;
        this.stage.height = this.props.height;
        this.stage.bgSrc = this.props.bgSrc;
      }
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.scale = this.props.zoom;
      this.setScale();
    }
  }
  // shouldComponentUpdate(nextProps: Readonly<RenderProps>) {
  //   this.stage.bgSrc = nextProps.bgSrc;
  //   return true;
  // }
  // componentWillReceiveProps(nextProps: Readonly<RenderProps>) {
  // }

  toJson = () => {
    return this.stage?.toJson();
  };

  fromJson = (json: any) => {
    this.stage?.fromJson(json);
    this.setState({
      target: null,
    });
  };

  // 解决缩放窗口svg文字渲染异常
  onWinResize = () => {
    this.fixTextSize();
    this.setScale();
  };

  // 为什么使用transform后修改winsize会导致svg文字渲染异常？
  fixTextSize(root = this.stage) {
    root?.children.forEach((v) => {
      if (v instanceof Text) {
        v.fontSize = v.fontSize;
      }
      // @ts-ignore
      if (v.children) this.fixTextSize(v);
    });
  }

  update() {
    this.moveable.updateRect();
  }

  // 移动
  tx: number = 0;
  ty: number = 0;
  onDragStart = () => {
    this.tx = this.selectNode?.x || 0;
    this.ty = this.selectNode?.y || 0;
  };
  onDrag = ({ top, left }: { top: number; left: number }) => {
    if (this.selectNode) {
      this.selectNode.x = +(this.tx + left).toFixed(1);
      this.selectNode.y = +(this.ty + top).toFixed(1);
    }
  };
  onDragEnd = () => {
    this.props.onUpdate();
  };

  // 旋转
  onRotateStart = () => {};
  onRotate = ({ delta }: { delta: number }) => {
    if (this.selectNode) {
      this.selectNode.rotation += +delta.toFixed(1);
    }
  };
  onRotateEnd = () => {
    this.props.onUpdate();
  };

  // 大小
  onScaleStart = () => {};
  //    direction 方向描述
  //   -1,-1   0,-1   1,-1
  //   -1,0    0,0    1,0
  //   -1,1    0,1    1,1
  onScale = (e: any) => {
    const { delta, direction, clientX, clientY } = e;
    if (this.selectNode instanceof Image) {
      const tw = this.selectNode.width * delta[0];
      const th = this.selectNode.height * delta[1];
      this.selectNode.width = Math.abs(tw);
      this.selectNode.height = Math.abs(th);
      if (direction[1] === -1) {
        if (delta[1] > 1) {
          // 增加高度
          this.selectNode.y = this.selectNode.y - this.selectNode.bBox.height * (delta[1] - 1);
        } else {
          this.selectNode.y = this.selectNode.y + this.selectNode.bBox.height * (1 - delta[1]);
        }
      }
      if (direction[0] === -1) {
        if (delta[0] > 1) {
          this.selectNode.x = this.selectNode.x - this.selectNode.bBox.width * (delta[0] - 1);
        } else {
          this.selectNode.x = this.selectNode.x + this.selectNode.bBox.width * (1 - delta[0]);
        }
      }
    } else if (this.selectNode instanceof Figure) {
      const boundingRect = this.renderBox?.getBoundingClientRect();
      if (direction[1] === -1) {
        this.selectNode.scaleY = this.selectNode.scaleY * delta[1];
        this.selectNode.y = (clientY - (boundingRect?.y || 0)) / this.scale;
      }
      if (direction[1] === 1) {
        this.selectNode.scaleY = Math.abs(this.selectNode.scaleY * delta[1]);
      }
      if (direction[0] === -1) {
        this.selectNode.x = (clientX - (boundingRect?.x || 0)) / this.scale;
        this.selectNode.scaleX = Math.abs(this.selectNode.scaleX * delta[0]);
      }
      if (direction[0] === 1) {
        this.selectNode.scaleX = Math.abs(this.selectNode.scaleX * delta[0]);
      }
    } else if (this.selectNode instanceof Text) {
      const boundingRect = this.renderBox?.getBoundingClientRect() as DOMRect;
      // 往上拉
      if (direction[1] === -1) {
        this.selectNode.y = (clientY - boundingRect.y) / this.scale;
        const tf = this.selectNode.fontSize * delta[1];

        this.selectNode.fontSize = tf >> 0;
      }
      // 往下拉
      if (direction[1] === 1) {
        const tf = this.selectNode.fontSize * delta[1];
        this.selectNode.fontSize = tf >> 0;
      }
      // 往左拉
      if (direction[0] === -1) {
        if (delta[0] > 1) {
          this.selectNode.x = (clientX - boundingRect.x) / this.scale;
          const tf = this.selectNode.fontSize * (0.05 + delta[0]);

          this.selectNode.fontSize = tf >> 0;
        } else {
          const tf = this.selectNode.fontSize * delta[0];

          this.selectNode.fontSize = tf >> 0;
        }
      }
      // 往右拉
      if (direction[0] === 1) {
        if (delta[0] > 1) {
          const tf = this.selectNode.fontSize * (0.05 + delta[0]);

          this.selectNode.fontSize = tf >> 0;
        } else {
          const tf = this.selectNode.fontSize * delta[0];

          this.selectNode.fontSize = tf >> 0;
        }
      }
    }
  };
  onScaleEnd = () => {
    this.props.onUpdate();
  };

  /**
   * 保存图片
   * @return {Promise<void>}
   */
  saveToImage = async (name?: string, width?: number, height?: number, callback?: any) => {
    const { stage, props } = this;
    await covertSVGToImage(
      stage?.dom as SVGGElement,
      name || 'test',
      width || props.width,
      height || props.height,
      'png',
      callback,
    );
  };

  /**
   * 鼠标滚动事件
   * @param {WheelEvent} e
   */
  onWheel = (e: WheelEvent) => {
    const { metaKey, ctrlKey } = e;
    if (metaKey || ctrlKey) {
      // 按下command键或者ctrl键的时候才缩放，兼容win和mac

      e.preventDefault(); // 阻止一下默认事件

      // 总该有个限度吧
      this.scale = _.clamp(this.scale - e.deltaY / 1000, 0.2, 5);

      this.setScale();
    }
  };

  /**
   * 设置缩放
   */
  setScale = () => {
    const { scale, props, renderCmp, renderBox, renderStage } = this;
    const width = props.width * scale;
    const height = props.height * scale;

    // 过小边界
    const { clientWidth, clientHeight } = renderCmp as HTMLDivElement;

    // let edgeLeft = 0,
    //   edgeTop = 0;
    // if (width < clientWidth) edgeLeft = (clientWidth - width) * 0.5;
    // if (height < clientHeight) {
    //   edgeTop = (clientHeight - height) * 0.5;
    // }
    if (width >= clientWidth) {
      renderCmp!.style.width = width + 40 + 'px';
    } else {
      (renderCmp as HTMLDivElement).style.width = '100%';
    }
    if (height >= clientHeight) {
      renderCmp!.style.height = height + 140 + 'px';
    } else {
      renderCmp!.style.height = '100%';
    }

    // if (window.innerHeight - 75 < height + 20) {
    //   renderCmp!.style.height = clientHeight + 'px';
    // }

    // if (window.innerWidth - 407 < width + 20) {
    //   renderCmp!.style.width = width + 'px';
    // }

    renderBox!.style.height = `${height}px`;
    renderBox!.style.width = `${width}px`;
    // renderBox!.style.transform = `translate(${edgeLeft}px, ${edgeTop}px)`;
    renderStage!.style.transform = `scale(${scale}, ${scale})`;

    // TODO 发现svg渲染的文字会收到transform:scale的影响渲染异常，只能使用老旧的zoom属性了
    // TODO 这个属性略卡
    // renderStage!.style["zoom"] = scale;
    this.stage && (this.stage.zoom = scale);
    this.moveable.updateRect();
  };

  /**
   * 拖拽组件相关
   * @param e
   */
  onDrop = (e: any) => {
    const { clientX, clientY, dataTransfer } = e;
    const boundingRect = this.renderBox?.getBoundingClientRect();
    const x = (clientX - (boundingRect?.x || 0)) / this.scale;
    const y = (clientY - (boundingRect?.y || 0)) / this.scale;
    const data = JSON.parse(dataTransfer.getData('module'));
    //@ts-ignore
    const node = new (getClass(data.type))();
    node.x = x;
    node.y = y;

    if (data.type === 'Image') {
      node.x = 50 / this.scale;
      node.y = 235 / this.scale;
      this.setState({
        visible: true,
        node: node,
      });
      return;
    }
    this.stage?.add(node);
  };
  onDragOver = (e: any) => e.preventDefault();

  onStageMouseDown = (e: MouseEvent) => {
    const target = e.target;

    // @ts-ignore
    const _id = target.getAttribute('_id');
    const node: Node<any> = this.stage?.findNode(_id) as Node<any>;

    if (node == this.stage) {
      this.props.onSelect(null);
      this.setState({ target: null });
      return;
    }

    this.selectNode = node;
    this.props.onSelect(node);
    this.setState({
      isText: node instanceof Text,
      keepRatio: node instanceof Text || node instanceof Figure,
      target: node.dom,
    });
  };

  /**
   * 删除
   */
  onDeleteNode = () => {
    const { selectNode } = this;
    selectNode?.parent?.remove(selectNode);
    this.setState({ target: null });
  };

  /**
   * 移动到上层
   */
  onMoveUp = () => {
    const { selectNode } = this;
    const parent = selectNode?.parent as Group;

    const selectIndex = parent.children.indexOf(selectNode as Node<any>);

    // 看看上一个有没有
    if (selectIndex == parent.children.length - 1) return;

    const nextNode = parent.children[selectIndex + 1];

    const selectDom = selectNode?.dom;
    const nextDom = nextNode.dom;

    // 交换渲染
    nextDom && parent.dom?.insertBefore(nextDom, selectDom);

    // 交换数据
    parent.children[selectIndex] = nextNode;
    parent.children[selectIndex + 1] = selectNode as Node<any>;
  };

  /**
   * 移动到下层
   */
  onMoveDown = () => {
    const { selectNode } = this;
    const parent = selectNode?.parent as Group;

    // 看看下一个有没有
    const selectIndex = parent?.children.indexOf(selectNode as Node<any>);

    if (selectIndex == 0) return;

    const beforeNode = parent?.children[selectIndex - 1];

    const selectDom = selectNode?.dom;
    const beforeDom = beforeNode?.dom;

    // 交换渲染
    parent?.dom?.insertBefore(selectDom, beforeDom);

    // 交换数据
    parent.children[selectIndex] = beforeNode;
    parent.children[selectIndex - 1] = selectNode as Node<any>;
  };

  render() {
    const { keepRatio, target, isText } = this.state;

    return (
      <div
        id={'renderCmp'}
        className={styles.render}
        ref={(ref: HTMLDivElement) => (this.renderCmp = ref)}
      >
        <MaterialRepo
          visible={this.state.visible}
          onFinish={async (urls: string[]) => {
            if (urls.length > 0) {
              const node = this.state.node as any;
              if (node === null) {
                return;
              }
              const url = urls[0].replace('//qzz-material.forwe.store', '//qzz-fadmin.forwe.store');
              node.setSrc(url);
              const image = await getImage(url);
              if (image.width > this.props.width / 2) {
                node.width = this.props.width / 2;
                node.height = (this.props.width / 2) * (image.height / image.width);
              }
              this.stage?.add(node);
            }
          }}
          visibleChange={(vis: boolean) => {
            this.setState({
              visible: vis,
            });
          }}
        />

        {/*这层用来解决transform不影响包围大小的问题*/}
        <div className={styles.renderBox} ref={(ref: HTMLDivElement) => (this.renderBox = ref)}>
          <div
            className={styles.renderStage}
            ref={(ref: HTMLDivElement) => (this.renderStage = ref)}
            onDrop={this.onDrop}
            onDoubleClick={(e) => {
              const target = e.target as any;
              if (target.nodeName === 'text') {
                target.style.display = 'none';
                this.setState({ target: null });
                const node = document.createElement('input');
                node.value = target.innerHTML;
                document.body.appendChild(node);
                node.select();
                const text = this.stage?.findNode(target.getAttribute('_id')) as Node<any>;
                node.onblur = () => {
                  text.text = node.value;
                  document.body.removeChild(node);
                  target.style.display = 'block';
                  this.selectNode = text;
                  this.props.onSelect(text);
                  this.setState({ target: text?.dom });
                };
                node.style.position = 'absolute';
                node.style.fontSize = text?.fontSize * this.scale + 'px';
                node.style.outline = 'none';
                node.style.padding = '0';
                node.style.border = '1px solid #4af';
                node.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                node.width = text?.width;

                const rect = this.renderBox?.getBoundingClientRect() as DOMRect;
                node.style.top = text.y * this.scale + rect.top - 6 + 'px';
                node.style.left = text.x * this.scale + rect.left - 2 + 'px';
              }
            }}
            onDragOver={this.onDragOver}
          />
        </div>
        <Moveable
          ref={(ref) => (this.moveable = ref)}
          target={target}
          ables={[Editable]}
          props={{
            editable: true,
            dimensionViewable: isText,
            onMoveUp: this.onMoveUp,
            onMoveDown: this.onMoveDown,
            onDeleteNode: this.onDeleteNode,
          }}
          keepRatio={keepRatio}
          zoom={this.props.zoom}
          origin={false}
          draggable={true}
          rotatable={true}
          scalable={true}
          onDragStart={this.onDragStart}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          onRotateStart={this.onRotateStart}
          onRotate={this.onRotate}
          onRotateEnd={this.onRotateEnd}
          onScaleStart={this.onScaleStart}
          onScale={this.onScale}
          onScaleEnd={this.onScaleEnd}
        />
      </div>
    );
  }
}

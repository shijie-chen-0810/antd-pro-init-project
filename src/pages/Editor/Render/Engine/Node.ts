/*
 * Node.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { setAttribute } from '@/pages/Editor/Render/Engine/utils';
import type { Stage } from './Stage';
import type { Group } from './Group';

export abstract class Node<T extends SVGGraphicsElement> {
  onChange: null | (() => void) = null;
  [key: string]: any;

  static ID = 0;

  protected _dom: T | null = null;

  get dom() {
    return this._dom;
  }

  protected _id: number = Node.ID++;

  get id() {
    return this._id;
  }

  protected _type = 'Node';

  get type() {
    return this._type;
  }

  protected _parent: Group | null = null;

  get parent() {
    return this._parent;
  }

  get stage(): Stage | undefined {
    if (this.type === 'Stage') {
      return this as unknown as Stage;
    } else {
      return this.parent?.stage;
    }
  }

  protected _x: number = 0;
  get x() {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
    // this.setAttribute("x", `${x}`);
    this.updateTransform();
  }

  protected _y: number = 0;
  get y() {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
    // this.setAttribute("y", `${y}`);
    this.updateTransform();
  }

  protected _rotation: number = 0;
  set rotation(rotation: number) {
    this._rotation = rotation % 360;
    while (this._rotation < 0) {
      this._rotation += 360;
    }
    this.updateTransform();
  }

  get rotation() {
    return this._rotation;
  }

  get bBox(): SVGRect {
    return (this.dom as T).getBBox();
  }

  updateTransform = () => {
    const { rotation, x, y, bBox } = this;
    const rotate = `rotate(${rotation} ${bBox?.x},${bBox?.y})`;
    const translate = `translate(${x} ${y})`;
    if (this._dom) {
      setAttribute(this._dom, 'transform', [translate, rotate].join(' '));
    }
    if (this.onChange) this.onChange();
  };

  toJson(): any {
    const { x, y, rotation, type } = this;
    return {
      type,
      x,
      y,
      rotation,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    return this;
  }
}

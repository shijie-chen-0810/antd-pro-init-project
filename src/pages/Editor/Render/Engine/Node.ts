/*
 * Node.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { setAttribute } from '@/pages/Editor/Render/Engine/utils';
import type { Stage } from './Stage';
import type { Group } from './Group';

interface FormConfig {
  isRequired: boolean;
  label: string;
  name: string;
}

interface NodeConfig {
  canDelete: boolean;
  canDrag: boolean;
  canScale: boolean;
}

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

  protected _isForm: boolean = false;
  get isForm() {
    return this._isForm;
  }

  set isForm(isForm: boolean) {
    this._isForm = isForm;
    this.formConfig = {
      isRequired: false,
      label: 'label' + this._id,
      name: 'name' + this._id,
    };
  }

  protected _formConfig: Partial<FormConfig> = {};
  get formConfig() {
    return this._formConfig;
  }

  set formConfig(config: Partial<FormConfig>) {
    this._formConfig = {
      ...this.formConfig,
      ...config,
    };
  }

  protected _nodeConfig: NodeConfig = { canDelete: true, canDrag: true, canScale: true };
  get nodeConfig() {
    return this._nodeConfig;
  }

  set nodeConfig(config: NodeConfig) {
    this._nodeConfig = {
      ...this._nodeConfig,
      ...config,
    };
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
    const { x, y, rotation, type, isForm, formConfig, nodeConfig } = this;
    return {
      type,
      x,
      y,
      rotation,
      nodeConfig,
      isForm,
      formConfig,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, isForm, formConfig, nodeConfig } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.nodeConfig = nodeConfig;
    this.isForm = isForm;
    this.formConfig = formConfig;
    return this;
  }
}

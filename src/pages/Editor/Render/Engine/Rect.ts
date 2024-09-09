/*
 * Rect.ts
 * Created by 还有醋v on 2022/4/22.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { createSvgElement, setAttribute, setId } from './utils';
import { Node } from './Node';

export class Rect extends Node<SVGRectElement> {
  protected _type: string = 'Rect';

  constructor(width: number = 100, height: number = 100, fill = '#000000') {
    super();
    this._dom = createSvgElement('rect') as SVGRectElement;
    setId(this._dom, this._id);
    this.height = height;
    this.width = width;
    this.fill = fill;
    this.stroke = '#000000';
    this.strokeWidth = 0;
  }

  protected _fill: string = '#000000';
  get fill() {
    return this._fill;
  }

  set fill(fill: string) {
    this._fill = fill;
    this.dom && setAttribute(this.dom, 'fill', `${fill}`);
    if (this.onChange) this.onChange();
  }

  protected _stroke: string = '#000000';
  get stroke() {
    return this._stroke;
  }

  set stroke(stroke: string) {
    this._stroke = stroke;
    this.dom && setAttribute(this.dom, 'stroke', `${stroke}`);
    if (this.onChange) this.onChange();
  }

  protected _strokeWidth: number = 0;
  get strokeWidth() {
    return this._strokeWidth;
  }

  set strokeWidth(strokeWidth: number) {
    this._strokeWidth = strokeWidth;
    this.dom && setAttribute(this.dom, 'stroke-width', `${strokeWidth}`);
    if (this.onChange) this.onChange();
  }

  protected _width: number = 0;
  get width() {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
    this.dom && setAttribute(this.dom, 'width', `${width}`);
    this.updateTransform();
  }

  protected _height: number = 0;
  get height() {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
    this.dom && setAttribute(this.dom, 'height', `${height}`);
    this.updateTransform();
  }

  toJson() {
    const { x, y, rotation, type, width, height, stroke, strokeWidth, fill } = this;
    return {
      x,
      y,
      rotation,
      type,
      width,
      height,
      stroke,
      strokeWidth,
      fill,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, width, height, stroke, strokeWidth, fill } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.fill = fill;
    return this;
  }
}

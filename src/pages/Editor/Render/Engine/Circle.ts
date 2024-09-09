/*
 * Rect.ts
 * Created by 还有醋v on 2022/4/22.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { createSvgElement, setAttribute, setId } from './utils';
import { Node } from './Node';

export class Circle extends Node<SVGCircleElement> {
  protected _type: string = 'Circle';

  constructor(r: number = 50, fill = '#000000') {
    super();
    this._dom = createSvgElement('circle') as SVGCircleElement;
    setId(this._dom, this._id);
    this.r = r;
    this.fill = fill;
    this.stroke = '#000000';
    this.strokeWidth = 0;
  }

  protected _r: number = 0;
  get r() {
    return this._r;
  }

  set r(r: number) {
    this._r = r;
    this._dom && setAttribute(this._dom, 'r', `${r}`);
    this.updateTransform();
  }

  protected _fill: string = '#000000';
  get fill() {
    return this._fill;
  }

  set fill(fill: string) {
    this._fill = fill;
    this._dom && setAttribute(this._dom, 'fill', `${fill}`);
    if (this.onChange) this.onChange();
  }

  protected _stroke: string = '#000000';
  get stroke() {
    return this._stroke;
  }

  set stroke(stroke: string) {
    this._stroke = stroke;
    this._dom && setAttribute(this._dom, 'stroke', `${stroke}`);
    if (this.onChange) this.onChange();
  }

  protected _strokeWidth: number = 0;
  get strokeWidth() {
    return this._strokeWidth;
  }

  set strokeWidth(strokeWidth: number) {
    this._strokeWidth = strokeWidth;
    this._dom && setAttribute(this._dom, 'stroke-width', `${strokeWidth}`);
    if (this.onChange) this.onChange();
  }

  toJson() {
    const { x, y, rotation, type, r, stroke, strokeWidth, fill } = this;
    return {
      x,
      y,
      rotation,
      type,
      r,
      stroke,
      strokeWidth,
      fill,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, r, stroke, strokeWidth, fill } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.r = r;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.fill = fill;
    return this;
  }
}

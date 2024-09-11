/*
 * Text.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { createSvgElement, setAttribute, setId } from './utils';
import { Node } from './Node';

export class Text extends Node<SVGTextElement> {
  protected _type: string = 'Text';

  private _text: string = '';
  get text() {
    return this._text;
  }

  set text(text: string) {
    this._text = text;
    this.dom && (this.dom.textContent = text);
    this.updateTransform();
  }

  private _fontSize: number = 32;
  get fontSize() {
    return this._fontSize;
  }

  set fontSize(fontSize: number) {
    this._fontSize = fontSize;
    this._dom && setAttribute(this._dom, 'font-size', `${fontSize}`);
    this.updateTransform();
  }

  protected _fill: string = '#000000';
  get fill() {
    return this._fill;
  }

  set fill(fill: string) {
    this._fill = fill;
    this._dom && setAttribute(this._dom, 'fill', fill);
    if (this.onChange) this.onChange();
    this.fontSize = this.fontSize;
  }

  constructor(text = '双击在此处编辑文字', fontSize = 32, fill = '#000000') {
    super();
    this._dom = createSvgElement('text') as SVGTextElement;
    setId(this._dom, this._id);
    setAttribute(this._dom, 'alignment-baseline', 'hanging');
    setAttribute(this._dom, 'white-space', 'initial');
    this.text = text;
    this.fontSize = fontSize;
    this.fill = fill;
    this.y = 0;
    this.isForm = false;
  }

  toJson() {
    const { x, y, rotation, type, text, fill, fontSize, isForm, formConfig, nodeConfig } = this;
    return {
      x,
      y,
      rotation,
      type,
      text,
      fill,
      fontSize,
      isForm,
      formConfig,
      nodeConfig,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, text, fill, fontSize, isForm, formConfig, nodeConfig } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.text = text;
    this.fill = fill;
    this.fontSize = fontSize;
    this.isForm = isForm;
    this.formConfig = formConfig;
    this.nodeConfig = nodeConfig;
    return this;
  }
}

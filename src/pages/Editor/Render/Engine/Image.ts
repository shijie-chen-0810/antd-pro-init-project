/*
 * Image.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { createSvgElement, setAttribute, setId } from './utils';
import { getImage, imageToBase64 } from '@/pages/Editor/Render/renderTools';
import { Node } from './Node';

export class Image extends Node<SVGGElement> {
  protected _type: string = 'Image';

  protected _width: number = 0;
  get width() {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
    this._svgImage && setAttribute(this._svgImage, 'width', `${width}`);
    this._clipRect && setAttribute(this._clipRect, 'width', `${width}`);
    this.roundness = this.roundness;
    this.updateTransform();
  }

  protected _height: number = 0;
  get height() {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
    this._svgImage && setAttribute(this._svgImage, 'height', `${height}`);
    this._clipRect && setAttribute(this._clipRect, 'height', `${height}`);
    this.roundness = this.roundness;
    this.updateTransform();
  }

  protected _roundness: number = 0;
  get roundness() {
    return this._roundness;
  }

  set roundness(roundness: number) {
    this._roundness = roundness;
    this._clipRect && setAttribute(this._clipRect, 'rx', `${(roundness / 200) * this._width}`);
    this._clipRect && setAttribute(this._clipRect, 'ry', `${(roundness / 200) * this._width}`);
  }

  /**
   * src
   * @type {string}
   */
  private _src: string = '';
  get src() {
    return this._src;
  }

  set src(src: string) {
    this._src = src;
    this.setSrc(src);
  }

  protected _url: string = '';
  protected _base64: string = '';
  protected _image: HTMLImageElement | null = null;
  _svgImage: SVGImageElement | null = null;
  _clipPath: SVGClipPathElement | null = null;
  _clipRect: SVGRectElement | null = null;

  constructor(src: string) {
    super();
    this._dom = createSvgElement('g') as SVGGElement;

    this._clipPath = createSvgElement('clipPath') as SVGClipPathElement;
    this._dom.appendChild(this._clipPath);
    setAttribute(this._clipPath, 'id', `clipPath${this.id}`);

    this._clipRect = createSvgElement('rect') as SVGRectElement;
    this._clipPath.appendChild(this._clipRect);

    this._svgImage = createSvgElement('image') as SVGImageElement;
    setAttribute(this._svgImage, 'crossorigin', 'anonymous');
    setAttribute(this._svgImage, 'preserveAspectRatio', 'none');
    setAttribute(this._svgImage, 'clip-path', `url(#clipPath${this.id})`);
    this._dom.appendChild(this._svgImage);

    this.dom && setId(this.dom, this.id);
    this.src = src;
  }

  async setSrc(src: string) {
    if (!src) {
      return;
    }
    this._url = src;
    if (src.match(/data:image\/.*;base64,/)) {
      // base64
      this._base64 = src;
    } else {
      this._base64 = await imageToBase64(src);
    }
    this._svgImage && setAttribute(this._svgImage, 'href', this._base64);

    this._src = src;
    this._image = await getImage(src);
    if (!this.width) {
      this.width = this._image.width;
    }
    if (!this.height) {
      this.height = this._image.height;
    }
  }

  toJson() {
    const { x, y, rotation, type, width, height, src, roundness } = this;
    return {
      x,
      y,
      rotation,
      type,
      width,
      height,
      src,
      roundness,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, width, height, src, roundness } = json;

    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.src = src;
    this.width = width;
    this.height = height;
    this.roundness = roundness;

    return this;
  }
}

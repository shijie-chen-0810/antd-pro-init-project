/*
 * Stage.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { Group } from "./Group";
import { getClass } from "./typeMap";
import { getImage, imageToBase64, toDataURL } from "@/pages/Editor/Render/renderTools";
import { createSvgElement, setAttribute, setId } from "./utils";
import { message } from "antd";

export class Stage extends Group {

  protected _type: string = "Stage";


  zoom: number = 1;

  protected _width: number = 0;
  get width() {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
    setAttribute(this._dom, "width", `${width}`);
    setAttribute(this._bg, "width", `${width}`);
    if (this.onChange) this.onChange();
  }

  protected _height: number = 0;
  get height() {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
    setAttribute(this._dom, "height", `${height}`);
    setAttribute(this._bg, "height", `${height}`);
    if (this.onChange) this.onChange();
  }

  _bg: SVGImageElement;
  protected _url: string = "";
  protected _base64: string = "";
  protected _image: HTMLImageElement = null;

  private _userLimit: number = 0;
  get userLimit() {
    return this._userLimit;
  }

  set userLimit(userLimit: number) {
    this._userLimit = userLimit;
  }
  /**
   * src
   * @type {string}
   */
  private _bgSrc: string = "";
  get bgSrc() {
    return this._bgSrc;
  }

  set bgSrc(bgSrc: string) {
    this._bgSrc = bgSrc;
    this.setSrc(bgSrc);
  }

  async setSrc(bgSrc: string) {
    if (!bgSrc) {
      bgSrc = 'https://qzz-static.forwe.store/fighting-manager/icons/%E9%80%8F%E6%98%8E.png'
    }
    try {
      this._base64 = await imageToBase64(bgSrc);
    } catch (e: any) {
      message.error(e.message)
    }
    setAttribute(this._bg, "href", this._base64);
    this._image = await getImage(bgSrc);
    if (!this.width) {
      this.width = this._image.width;
    }
    if (!this.height) {
      this.height = this._image.height;
    }

  }

  constructor(width: number, height: number) {
    super();

    this._dom = createSvgElement("svg") as SVGSVGElement;

    this._bg = createSvgElement("image") as SVGImageElement;
    setAttribute(this._bg, "crossorigin", "anonymous");
    setAttribute(this._bg, "preserveAspectRatio", "none");

    const waterMark = createSvgElement("text") as SVGTextElement;
    setAttribute(waterMark, "id", "watermark");
    setAttribute(waterMark, "font-size", "25px");
    setAttribute(waterMark, "dominant-baseline", "middle")
    setAttribute(waterMark, 'alignment-baseline', 'central')
    setAttribute(waterMark, "x", '50%');
    setAttribute(waterMark, "text-anchor", 'middle')
    setAttribute(waterMark, 'text-align', 'center')
    setAttribute(waterMark, "fill", "#fff")
    setAttribute(waterMark, 'dy', '-1.7%')
    setAttribute(waterMark, "y", height + "");

    const svgns = "http://www.w3.org/2000/svg"
    const bg = document.createElementNS(svgns, "rect")
    bg.setAttribute("x", '0')
    bg.setAttribute("y", height - 48 + '')
    bg.setAttribute("width", width + 'px')
    bg.setAttribute("height", 48 + 'px')
    bg.setAttribute("fill", 'rgba(0,0,0,0.3)')

    waterMark.appendChild(document.createTextNode("由蒲公英提供技术服务"))

    this.waterMark = waterMark;
    this._dom.appendChild(this._bg);
    this._dom.appendChild(bg);
    this._dom.appendChild(waterMark);
    setId(this._dom, this._id);

    setAttribute(this._dom, "version", "1.1");
    setAttribute(this._dom, "baseProfile", "full");
    setAttribute(this._dom, "xmlns", "http://www.w3.org/2000/svg");
    this.height = height;
    this.width = width;
  }

  toJson() {
    const { x, y, rotation, type, children, width, height, bgSrc, userLimit } = this;
    const childrenNode = children.map((v) => {
      return v.toJson();
    });

    return {
      x, y, rotation,
      type,
      width,
      height,
      bgSrc,
      userLimit,
      children: childrenNode,
    }

  }

  fromJson(json: any): any {
    this.children.forEach((v) => this.remove(v));

    const { x, y, width, height, rotation, children, userLimit, bgSrc } = json;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this._bgSrc = bgSrc;
    this.userLimit = userLimit;

    if (!children) {
      return this;
    }
    children.forEach((v: any) => {
      const child = new (getClass(v.type));
      child.fromJson(v);
      this.add(child);
    });

    return this;

  }


}

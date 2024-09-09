/*
 * Figure.ts
 * Created by 还有醋v on 2022/4/24.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

// import { setAttribute, setId } from "./Engine/utils";
// import { Image } from "./Engine/Image";
// import { Group } from "./Engine/Group";
// import { Text } from "./Engine/Text";
import { setAttribute, setId } from './utils';
import { Image } from './Image';
import { Group } from './Group';
import { Text } from './Text';

export class Figure extends Group {
  protected _type = 'Figure';

  avatar: Image;
  name: Text;

  protected _userId: string = '';

  get userId() {
    return this._userId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  protected _scaleX: number = 1;
  get scaleX() {
    return this._scaleX;
  }

  set scaleX(scaleX: number) {
    this._scaleX = scaleX;
    this.updateTransform();
  }

  protected _scaleY: number = 1;
  get scaleY() {
    return this._scaleY;
  }

  set scaleY(scaleY: number) {
    this._scaleY = scaleY;
    this.updateTransform();
  }

  set roundness(roundness: number) {
    this.avatar.roundness = roundness;
  }

  get roundness() {
    return this.avatar.roundness;
  }

  set fontSize(fontSize: number) {
    this.name.fontSize = fontSize;
  }

  get fontSize() {
    return this.name.fontSize;
  }

  set fill(fill: string) {
    this.name.fill = fill;
  }

  get fill() {
    return this.name.fill;
  }

  set src(src: string) {
    this.avatar.src = src;
  }

  get src() {
    return this.avatar.src;
  }

  set text(text: string) {
    this.name.text = text;
  }

  get text() {
    return this.name.text;
  }

  updateTransform = () => {
    const { rotation, x, y, bBox, scaleX, scaleY } = this;
    const rotate = `rotate(${rotation} ${bBox?.x},${bBox?.y})`;
    const translate = `translate(${x} ${y})`;
    const scale = `scale(${scaleX} ${scaleY})`;
    this._dom && setAttribute(this._dom, 'transform', [translate, rotate, scale].join(' '));
    if (this.onChange) this.onChange();
  };

  constructor(
    src = 'https://qzz-static.forwe.store/fighting-manager/imgs/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.png',
    text = '姓名',
  ) {
    super();
    this.avatar = this.add(new Image(src));
    this.avatar.height = 100;
    this.avatar.width = 100;
    this.avatar.roundness = 100;

    this.name = this.add(new Text(text));
    this.name.dom && setAttribute(this.name.dom, 'text-anchor', 'middle');
    this.name.y = 112;
    this.name.x = 50;
    this.dom && setId(this.dom, this.id);
  }

  toJson() {
    const {
      x,
      y,
      rotation,
      type,
      text,
      scaleX,
      scaleY,
      roundness,
      fill,
      fontSize,
      userId,
      avatar,
    } = this;
    return {
      x,
      y,
      rotation,
      type,
      text,
      src: avatar.src,
      scaleX,
      scaleY,
      roundness,
      fill,
      fontSize,
      userId,
    };
  }

  fromJson(json: any) {
    const { x, y, rotation, text, src, scaleX, scaleY, roundness, fill, fontSize, userId } = json;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.avatar.src = src;
    this.text = text;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.roundness = roundness;
    this.fill = fill;
    this.fontSize = fontSize;
    this._userId = userId;
    return this;
  }
}

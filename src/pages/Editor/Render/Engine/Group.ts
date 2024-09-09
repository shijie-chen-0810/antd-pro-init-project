/*
 * Group.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { getClass } from './typeMap';
import { createSvgElement, setId } from './utils';
import { Node } from './Node';

export class Group extends Node<SVGGElement> {
  protected _waterMark: any;

  get waterMark(): any {
    return this._waterMark;
  }

  set waterMark(node: any) {
    this._waterMark = node;
  }

  protected _type: string = 'Group';

  protected _children: Node<SVGGraphicsElement>[] = [];
  get children() {
    return this._children;
  }

  constructor() {
    super();
    this._dom = createSvgElement('g') as SVGGElement;
    setId(this._dom, this._id);
  }

  add<T extends Node<any>>(node: T) {
    if (node.parent) node.parent.remove(node);
    this.dom?.appendChild(node.dom);
    this.children.push(node);
    node['_parent'] = this;
    return node;
  }

  remove<T extends Node<any>>(node: T) {
    const index = this.children.indexOf(node);
    if (index > -1) {
      this.dom?.removeChild(node.dom);
      this.children.splice(index, 1);
    }
    node['_parent'] = null;
    return node;
  }

  /**
   * 查找子节点的
   * @return {Node<any> | null}
   */
  findNode(id: string | number): Node<any> | null {
    if (id == `${this.id}`) return this;

    const children = this.children;
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const child = children[i];
      if (child.id == id) {
        return child;
      } else if (child instanceof Group) {
        const find = child.findNode(id);
        if (find) return find;
      }
    }
    return null;
  }

  toJson(): any {
    const { x, y, rotation, type, children } = this;

    const childrenNode = children.map((v) => {
      return v.toJson();
    });

    return {
      x,
      y,
      rotation,
      type,
      children: childrenNode,
    };
  }

  fromJson(json: any): any {
    this.children.forEach((v) => this.remove(v));

    const { x, y, rotation, children } = json;

    this.x = x;
    this.y = y;
    this.rotation = rotation;

    children.forEach((v: any) => {
      // @ts-ignore
      const child = new getClass(v.type);
      child.fromJson(v);
      this.add(child);
    });

    return this;
  }
}

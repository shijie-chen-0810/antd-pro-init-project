/*
 * utils.ts
 * Created by 还有醋v on 2022/4/23.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

export function createSvgElement(name: string) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}


export function setAttribute(ele: SVGElement, name: string, value: string) {
  ele.setAttribute(name, value);
}

export function setId(ele: SVGElement, id: number | string) {
  ele.setAttribute("_id", id + "");
  const len = ele.children.length;
  for (let i = 0; i < len; i++) {
    setId(ele.children[i] as SVGElement, id + "");
  }
}

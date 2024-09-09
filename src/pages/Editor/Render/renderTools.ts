/*
 * renderTools.ts
 * Created by 还有醋v on 2022/4/21.
 * Copyright © 2022 haiyoucuv. All rights reserved.
 */

import { message } from 'antd';

const toolCanvas = document.createElement('canvas');

/**
 * 从链接加载image
 * @param {string} src
 * @param callFun
 * @return {Promise<unknown>}
 */
export function getImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    try {
      image.onload = () => {
        resolve(image);
      };
      image.src = src;
    } catch (e: any) {
      message.error(e.message);
    }
  });
}

/**
 * 图片转base64
 * @param image
 * @return {Promise<string>}
 */
export async function imageToBase64(image: string | HTMLImageElement): Promise<string> {
  if (typeof image == 'string') {
    // eslint-disable-next-line no-param-reassign
    image = await getImage(image);
  }
  const { width, height } = image;
  toolCanvas.width = image.width;
  toolCanvas.height = image.height;

  const ctx = toolCanvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0);
  return toolCanvas.toDataURL(`image/png`);
}

export const toDataURL = (url: string): Promise<string> => {
  message.info('start fetch');
  return fetch(url)
    .then((response) => response.blob())
    .catch((e) => message.error(e))
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
};

/**
 * svg转图片
 * @param node
 * @param name
 * @param width
 * @param height
 * @param {string} type
 */
export async function covertSVGToImage(
  node: Node,
  name: string,
  width: number,
  height: number,
  type = 'png',
  callback: any,
) {
  toolCanvas.width = width;
  toolCanvas.height = height;
  const ctx = toolCanvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const serializer = new XMLSerializer();
  const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(node);

  const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  const image = await getImage(src);

  ctx.drawImage(image, 0, 0);
  callback(src);
  // toolCanvas.toBlob(
  //   (blob) => {
  //     // @ts-ignore
  //     callback(blob);
  //   },
  //   type,
  //   1,
  // );

  // const a = document.createElement("a");
  // a.download = `${name}.${type}`;
  // a.href = toolCanvas.toDataURL(`image/${type}`);
  // a.click();
}

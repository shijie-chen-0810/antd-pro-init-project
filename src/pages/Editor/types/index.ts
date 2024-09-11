/*
 * @Author: your name
 * @Date: 2024-09-09 17:16:49
 * @LastEditors: your name
 * @LastEditTime: 2024-09-11 17:47:11
 * @Description:
 * @FilePath: /antd-pro-project-fe/src/pages/Editor/types/index.ts
 */
/**
 * 文档信息
 */
import type { ReactNode } from 'react';

export interface PosterMeta {
  title: string;
  templateType: string;
}

export interface StageData {
  width: number;
  height: number;
  bgSrc: string;
}

export type ModuleType = 'Text' | 'Image' | 'Figure';
/**
 * 组件声明
 */

export interface ModuleBase {
  name: string;
  icon: string | ReactNode; // url or icon
  id: string;
  type: ModuleType;
}

// export interface ModuleMaterial extends ModuleBase{
//     url: string,
//     type: 'text'
// }
//
// export interface ModuleText extends ModuleBase {
//     type: 'material'
// }

/**
 * 组件
 */
// export type Module = ModuleMaterial | ModuleText;
export type Module = ModuleBase;

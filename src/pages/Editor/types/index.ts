/**
 * 文档信息
 */
import type { ReactNode } from "react";

export interface PosterMeta {
    title: string,
    type: string,
    staffs: Staff[],
    width: number,
    height: number,
    bgSrc: string,
    userLimit: number
}


/**
 * 图层信息
 */
export interface LayerInfo {

}



export type ModuleType = 'Text' | 'Image' | "Figure";
/**
 * 组件声明
 */

export interface ModuleBase {
    name: string,
    icon: string | ReactNode, // url or icon
    id: string
    type: ModuleType
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

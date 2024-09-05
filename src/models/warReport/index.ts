import { deepObjectMerge } from '@/utils/utils';
import { cloneDeep } from 'lodash';

type ReducerAction<P> = {
  type: string;
  payload: P;
};

export default {
  namespace: 'warReport',
  state: {
    blockList: [],
    selectId: '',
  },
  reducers: {
    addBlock: (state: WarReportState, action: ReducerAction<MaterialInfo>) => {
      const { blockList } = state;
      const newBlock = action.payload;
      blockList.push(newBlock);
      return { ...state, blockList };
    },
    changeBlock: (
      state: WarReportState,
      action: ReducerAction<{
        id: string;
        changeInfo: Partial<MaterialInfo>;
      }>,
    ) => {
      const { blockList } = state;
      const changeInfo = action.payload.changeInfo;
      const id = action.payload.id;
      let targetBlock = cloneDeep(blockList?.find((block) => block.id === id));
      targetBlock = deepObjectMerge(targetBlock || {}, changeInfo) as MaterialInfo;
      const newBlockInfo = blockList?.map((block) => {
        if (block.id === targetBlock?.id) {
          return targetBlock;
        } else {
          return block;
        }
      });
      return { ...state, blockList: newBlockInfo };
    },
    deleteBlock: (state: WarReportState, action: ReducerAction<{ id: string }>) => {
      const { blockList } = state;
      const id = action.payload.id;
      const newBlockList = blockList?.filter((block) => block.id !== id);
      return { ...state, blockList: newBlockList };
    },
    changeSelectId: (state: WarReportState, action: ReducerAction<string>) => {
      const selectId = action.payload;
      return { ...state, selectId };
    },
  },
};
export const WarReportReducers = {
  addBlock: 'warReport/addBlock',
  changeBlock: 'warReport/changeBlock',
  deleteBlock: 'warReport/deleteBlock',
  changeSelectId: 'warReport/changeSelectId',
};

// export type MaterialInfo = {
//   id: string;
//   blockType: 'text' | 'img';
//   width: number;
//   height: number;
//   position: { x: number; y: number };
//   text?: string;
//   fontSize?: number;
//   src?: string;
//   color?: string;
// };

export type WarReportState = {
  blockList: MaterialInfo[];
  selectId: string;
};

export type MaterialInfo = {
  id: string;
  blockType: 'text' | 'number' | 'img';
  width: number;
  height: number;
  position: { x: number; y: number };
  materialConfig: MaterialConfig;
} & TextMaterial &
  ImageMaterial;

type TextMaterial = {
  text?: string;
  textStyle?: {
    color?: string;
    fontSize?: number;
    fontStyle?: 'italic' | 'normal' | 'oblique';
    fontWeight?: 'normal' | 'blod';
    textAligin?: 'left' | 'center' | 'right';
  };
};
type ImageMaterial = {
  src?: string;
};
type MaterialConfig = {
  isForm: boolean;
  label: string;
  isRequired: boolean;
  canDelete: boolean;
};

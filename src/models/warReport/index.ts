export default {
  namespace: 'warReport',
  state: {
    blockList: [],
  },
  reducers: {},
};

export type WarReportState = {
  blockList: {
    id: number;
    blockType: 'text' | 'img';
    width: number;
    height: number;
    position: { x: number; y: number };
    text?: string;
    fontSize?: number;
    status?: 'edit' | 'view';
    src?: string;
    color?: string;
  };
};

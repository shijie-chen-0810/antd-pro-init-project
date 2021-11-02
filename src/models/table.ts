export interface TablePageState {
  pageIndex: number;
}

export default {
  namespace: 'tablePage',
  state: {
    pageIndex: 1,
  },
  reducers: {
    addPageIndex({ pageIndex, ...otherState }: TablePageState, action: { payload: number }) {
      console.log(action);
      return {
        ...otherState,
        pageIndex: pageIndex + action.payload,
      };
    },
  },
};

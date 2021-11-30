export interface SmallDemoState {
  pageIndex: number;
}

export default {
  namespace: 'smallDemo',
  state: {
    pageIndex: 1,
  },
  reducers: {
    addPageIndex({ pageIndex, ...otherState }: SmallDemoState, action: { payload: number }) {
      console.log(action);
      return {
        ...otherState,
        pageIndex: pageIndex + action.payload,
      };
    },
  },
};

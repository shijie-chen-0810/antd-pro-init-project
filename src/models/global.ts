export interface GlobalState {
  globalStatus: boolean;
}

export default {
  namespace: 'global',
  state: {
    globalStatus: true,
  },
  reducers: {
    changeStatus(state: GlobalState) {
      return {
        ...state,
        globalStatus: !state.globalStatus,
      };
    },
  },
};

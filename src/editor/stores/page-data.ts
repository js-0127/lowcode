import { create } from "zustand";

interface State {
  data: any;
}

interface Action {
  /**
   * 重置数据
   * @returns
   */
  resetData: () => void;

  /**
   * 设置变量值
   * @params component key
   * @params parentId 值
   * @returns
   */
  setData: (key: string, value: any) => void;
}

export const usePageDataStore = create<State & Action>((set) => ({
  data: {},
  setData: (key, value) =>
    set((state) => ({ data: { ...state.data }, [key]: value })),
  resetData: () => set({ data: {} }),
}));

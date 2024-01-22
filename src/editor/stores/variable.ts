import { create } from "zustand";

export interface Variable {
  /**
   * 变量名称
   */
  name: string;
  /**
   * 变量类型
   */
  type: string;
  /**
   * 变量默认值
   */
  defaultValue: string;
  /**
   * 备注
   */
  remark: string;
}

interface State {
  variables: Variable[];
}

interface Action {
  setVariables: (variables: Variable[]) => void;
}

export const useVariable = create<Action & State>((set) => ({
  variables: [],
  setVariables: (variables) => set({ variables }),
}));

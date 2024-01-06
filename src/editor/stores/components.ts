import { create } from "zustand";

export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
}

interface State {
  components: Component[];
  curComponentId?: number;
  curComponent: Component | null;
}
interface Action {
  /**
   * 添加组件
   */
  addComponent: (component: Component, parentId: number) => void;

  /**
   * 设置当前组件id
   */
  setCurComponentId: (componentId: number) => void;

  /**
   * 更改当前组件属性
   */
  updateComponentProps: (componentId: number, props: any) => void;
}

function getComponentById(
  id: number,
  components: Component[]
): ReturnType<Component | any> {
  for (const component of components) {
    if (id === component.id) {
      return component;
    }
    if (component.children && component.children.length > 0) {
      const res = getComponentById(id, component.children);
      if (res) {
        return res;
      }
    }
  }
}

export const useComponents = create<State & Action>((set, get) => ({
  components: [],
  curComponent: null,
  addComponent: (component: Component, parentId: number) => {
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent?.children) {
            parentComponent?.children?.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    });
  },
  setCurComponentId: (componentId: number) => {
    const state = get();

    return set({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    });
  },
  updateComponentProps: (componentId: number, props) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
        if (componentId === state.curComponentId) {
          return {
            curComponent: component,
            components: [...state.components],
          };
        }
        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    });
  },
}));

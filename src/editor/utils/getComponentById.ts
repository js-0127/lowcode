import { Component } from "@/editor/stores/components";

export function getComponentById(
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

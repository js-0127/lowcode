import { Component } from "@/editor/stores/components";
import { Variable } from "@/editor/stores/variable";

export const useFormatProps = (
  mode: "edit" | "preview",
  variables: Variable[],
  data: any
) => {
  return (component: Component) => {
    const props = Object.keys(component.props).reduce<any>((prev, cur) => {
      if (typeof component.props[cur] === "object") {
        if (component.props[cur]?.type === "static") {
          prev[cur] = component.props[cur]?.value;
        } else if (component.props[cur]?.type === "variable") {
          const variableName = component.props[cur]?.value;
          if (mode === "edit") {
            prev[cur] = `\$${variableName}`;
          } else if (mode === "preview") {
            const variable = variables.find(
              (item) => item.name === variableName
            );
            prev[cur] = data[variableName] || variable?.defaultValue;
          }
        }
      } else {
        prev[cur] = component.props[cur];
      }
      return prev;
    }, {});
    return props;
  };
};

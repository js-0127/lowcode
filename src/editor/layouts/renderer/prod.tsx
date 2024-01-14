import React, { useRef } from "react";
import { message } from "antd";
import { Component, useComponents } from "@/editor/stores/components";
import Space from "@/editor/components/space";
import Button from "@/editor/components/button";

import { componentEventMap } from "@/editor/layouts/setting/component-event";

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

export const ProdStage: React.FC = () => {
  const { components } = useComponents();

  const componentRefs = useRef<any>({});

  function handleEvent(component: Component) {
    const props: any = {};

    if (componentEventMap[component?.name]?.length) {
      componentEventMap[component?.name]?.forEach((event) => {
        const eventConfig = component?.props[event.name];

        if (eventConfig) {
          const { type, config } = eventConfig;

          props[event.name] = () => {
            if (type === "showMessage") {
              if (config?.type === "success") {
                message?.success(config?.text);
              } else if (config?.type === "error") {
                message?.error(config?.text);
              }
            } else {
              if (type === "componentFunction") {
                const component = componentRefs.current[config.componentId];
                if (component) {
                  console.log(config);

                  component[config.method]?.();
                }
              }
            }
          };
        }
      });
    }
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const props = handleEvent(component);

      if (!ComponentMap?.[component?.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            ref: (ref) => {
              componentRefs.current[component.id] = ref;
            },
            "data-component-id": component.id,
            ...component.props,
            ...props,
          },
          component.props.children || renderComponents(component.children || [])
        );
      }
    });
  }

  return <div>{renderComponents(components)}</div>;
};

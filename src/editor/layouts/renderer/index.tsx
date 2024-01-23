import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "@/editor/item-type";
import { Component, useComponents } from "@/editor/stores/components";
import Space from "@/editor/components/space";
import Button from "@/editor/components/button";
import SelectedMask from "@/editor/common/selected-mask";

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

export const Stage: React.FC = () => {
  const { components, setCurComponentId, curComponentId } = useComponents();

  const selectedMaskRef = useRef<any>(null);

  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef?.current.updatePosition();
    }
  }, [components]);

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      if (!ComponentMap?.[component?.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            ...component.props,
          },
          component.props.children || renderComponents(component.children || [])
        );
      }
    });
  }

  const [{ canDrop }, drop] = useDrop(() => ({
    //可以接收的元素类型
    accept: [ItemType.Button, ItemType.Space],

    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return {
        id: 0,
      };
    },

    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    function createMask(e: any) {
      const path = e.composedPath();
      for (let i = 0; i < path.length; i++) {
        const ele = path[i];
        if (ele.getAttribute) {
          if (ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            setCurComponentId(+componentId);
            return;
          }
        }
      }
    }
    let container = document.querySelector(".stage");
    if (container) {
      container.addEventListener("click", createMask, true);
    }
    return () => {
      container = document.querySelector(".stage");
      if (container) {
        container.removeEventListener("click", createMask, true);
      }
    };
  }, []);

  return (
    <div
      className="p-[24px] h-full stage"
      ref={drop}
      style={{ border: canDrop ? "1px solid rgb(124,77,255)" : "none" }}
    >
      {renderComponents(components)}
      {curComponentId && (
        <SelectedMask
          componentId={curComponentId}
          containerClassName="select-mask-container"
          offsetContainerClassName="stage"
          ref={selectedMaskRef}
        />
      )}
      <div className="select-mask-container" />
    </div>
  );
};

import React from "react";
import { Button, Space } from "antd";
import { useDrop } from "react-dnd";
import { ItemType } from "@/editor/item-type";
interface Component {
  /**
   * 唯一标识
   */
  id: number;

  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件属性
   */
  props: any;

  /**
   * 子组件
   */
  children?: Component[];
}

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const components: Component[] = [
  {
    id: 1,
    name: "Button",
    props: {
      type: "primary",
      children: "按钮",
      danger: true,
    },
  },
  {
    id: 2,
    name: "Space",
    props: {
      size: "large",
    },
    children: [
      {
        id: 3,
        name: "Button",
        props: {
          type: "dashed",
          children: "按钮1",
          className: "bg-indigo-600",
        },
      },
      {
        id: 4,
        name: "Button",
        props: {
          type: "default",
          children: "按钮2",
        },
      },
    ],
  },
];

export const Stage: React.FC = () => {
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      if (!component) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          { key: component.id, id: component.id, ...component.props },
          component.props.children || renderComponents(component.children || [])
        );
      }
      return null;
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

  return (
    <div
      className="p-[24px] h-full"
      ref={drop}
      style={{ border: canDrop ? "1px solid #ccc" : "none" }}
    >
      {renderComponents(components)}
    </div>
  );
};

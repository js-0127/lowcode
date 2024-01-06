import { ItemType } from "@/editor/item-type";
import React from "react";
import { useDrop } from "react-dnd";
import { Space as AntdSpace } from "antd";

interface Props {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: number;
  [key: string]: any;
}

const Space: React.FC<Props> = ({ children, id, size, direction }) => {
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Button, ItemType.Space],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return {
        id,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (!children.length) {
    return (
      <AntdSpace
        ref={drop}
        data-component-id={id}
        className="p-[16px]"
        style={{
          border: canDrop ? "1px solid #ccc" : "none",
          width: direction === "vertical" ? "100%" : "",
        }}
      >
        暂无内容
      </AntdSpace>
    );
  }
  return (
    <AntdSpace
      ref={drop}
      data-component-id={id}
      size={size}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid #ccc" : "none",
        width: direction === "vertical" ? "100%" : "",
      }}
    >
      {children}
    </AntdSpace>
  );
};

export default Space;

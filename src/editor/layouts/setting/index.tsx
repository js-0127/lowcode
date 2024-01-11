import { Segmented } from "antd";
import type { SegmentedValue } from "antd/es/segmented";
import { ComponentAttr } from "./component-attr";
import { ComponentEvent } from "./component-event";
import { useComponents } from "@/editor/stores/components";
import { useState } from "react";

export const Setting: React.FC = () => {
  const { curComponent, curComponentId } = useComponents();

  const [key, setKey] = useState<SegmentedValue>("属性");

  if (!curComponent || !curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["属性", "事件"]}
      />
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
};

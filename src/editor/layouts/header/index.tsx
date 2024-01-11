import { useComponents } from "@/editor/stores/components";
import { Button, Space } from "antd";
import ComponentTree from "./component-tree";
import { useCallback, useState } from "react";

export const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [open]);
  const onCancle = useCallback(() => {
    setOpen(false);
  }, [open]);
  
  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      <Space>
        <Button type="primary" onClick={onOpen}>
          组件树
        </Button>
        <ComponentTree open={open} onCancle={onCancle} />
        {mode === "edit" && (
          <Button
            type="primary"
            onClick={() => {
              setMode("preview");
              setCurComponentId(null);
            }}
          >
            预览
          </Button>
        )}
        {mode === "preview" && (
          <Button
            type="primary"
            onClick={() => {
              setMode("edit");
            }}
          >
            退出预览
          </Button>
        )}
      </Space>
    </div>
  );
};

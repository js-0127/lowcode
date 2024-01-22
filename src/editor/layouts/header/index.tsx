import { useComponents } from "@/editor/stores/components";
import { Button, Space } from "antd";
import ComponentTree from "./component-tree";
import { useCallback, useState } from "react";
import { DefineVariable } from "./define-variable";

export const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  const [open, setOpen] = useState<boolean>(false);

  const [variableVisible, setVariableVisible] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const onCancle = useCallback(() => {
    setOpen(false);
  }, []);

  const handleVariableCancle = useCallback(() => {
    setVariableVisible(false);
  }, []);

  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      <Space>
        <Button type="primary" onClick={onOpen}>
          查看大纲
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setVariableVisible(true);
          }}
        >
          定义变量
        </Button>
        <ComponentTree open={open} onCancle={onCancle} />
        <DefineVariable
          open={variableVisible}
          onCancle={handleVariableCancle}
        ></DefineVariable>
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

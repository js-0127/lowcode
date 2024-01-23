import { SelectVariableModal } from "@/editor/common/select-variable-modal";
import { SettingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useCallback, useState } from "react";
interface Value {
  type: "static" | "variable";
  value: any;
}

interface Props {
  value?: Value;
  onChange?: (value: Value) => void;
}

export const SettingFormItemInput: React.FC<Props> = ({ value, onChange }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const valueChange = useCallback(
    (e?: any) => {
      onChange &&
        onChange({
          type: "static",
          value: e?.target.value,
        });
    },
    [onChange]
  );

  const select = useCallback(
    (record: any) => {
      onChange &&
        onChange({
          type: "variable",
          value: record.name,
        });
      setVisible(false);
    },
    [onChange]
  );

  return (
    <div className="flex gap-[8px]">
      <Input
        disabled={value?.type === "variable"}
        value={value?.type === "static" || !value ? value?.value : ""}
        onChange={valueChange}
      />
      <SettingOutlined
        onClick={() => {
          setVisible(true);
        }}
        className="cursor-pointer"
        style={{ color: value?.type === "variable" ? "blue" : "" }}
      ></SettingOutlined>
      <SelectVariableModal
        open={visible}
        onCancle={() => {
          setVisible(false);
        }}
        onSelect={select}
      />
    </div>
  );
};

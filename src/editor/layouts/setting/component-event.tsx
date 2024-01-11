import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";
import { Collapse, Input, Select } from "antd";
import { useCallback } from "react";

export const componentEventMap = {
  [ItemType.Button]: [
    {
      name: "onClick",
      label: "点击事件",
    },
  ],
};

export const ComponentEvent: React.FC = () => {
  const { updateComponentProps, curComponentId, curComponent } =
    useComponents();

  // 事件类型改变
  const typeChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;
      updateComponentProps(curComponentId, { [eventName]: { type: value } });
    },
    [curComponentId, updateComponentProps]
  );

  //消息类型改变
  const messageTypeChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;

      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            type: value,
          },
        },
      });
    },
    [curComponentId, updateComponentProps]
  );

  //消息文本改变
  const messageTextChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;

      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            text: value,
          },
        },
      });
    },
    [curComponentId, updateComponentProps]
  );
  if (!curComponent) return null;
  return (
    <div className="px-[12px]">
      {(componentEventMap[curComponent?.name] || [])?.map((setting) => {
        return (
          <Collapse key={setting.name} defaultActiveKey={setting.name}>
            <Collapse.Panel header={setting.label} key={setting.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>动作：</div>
                <div>
                  <Select
                    style={{ width: 160 }}
                    options={[{ label: "显示提示", value: "showMessage" }]}
                    onChange={(value) => {
                      typeChange(setting.name, value);
                    }}
                    value={curComponent?.props?.[setting.name]?.type}
                  />
                </div>
              </div>
              {curComponent?.props?.[setting.name]?.type === "showMessage" && (
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>类型：</div>
                    <div>
                      <Select
                        className="w-[160px]"
                        options={[
                          { label: "成功", value: "success" },
                          { label: "失败", value: "error" },
                        ]}
                        onChange={(value) => {
                          messageTypeChange(setting.name, value);
                        }}
                        value={
                          curComponent?.props?.[setting.name]?.config?.type
                        }
                      ></Select>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>文本：</div>
                    <div>
                      <Input
                        className="w-[160px]"
                        onChange={(e) => {
                          messageTextChange(setting.name, e.target.value);
                        }}
                        value={
                          curComponent?.props?.[setting.name]?.config?.text
                        }
                      ></Input>
                    </div>
                  </div>
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

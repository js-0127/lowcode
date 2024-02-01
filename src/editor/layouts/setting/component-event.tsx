import { ItemType } from "@/editor/item-type";
import { Component, useComponents } from "@/editor/stores/components";
import { useVariable } from "@/editor/stores/variable";
import { getComponentById } from "@/editor/utils/getComponentById";
import { Collapse, Input, Select, TreeSelect } from "antd";
import { useCallback, useState } from "react";

export const componentEventMap = {
  [ItemType.Button]: [
    {
      name: "onClick",
      label: "点击事件",
    },
  ],
};

export const componentMethodMap = {
  [ItemType.Button]: [
    {
      name: "startLoading",
      label: "开始loading",
    },
    {
      name: "endLoading",
      label: "结束loading",
    },
  ],
};

export const ComponentEvent: React.FC = () => {
  const { updateComponentProps, curComponentId, curComponent, components } =
    useComponents();

  const { variables } = useVariable();

  const [selectedComponent, setSelectedComponent] =
    useState<Component | null>();

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

  //组件改变
  const componentChange = useCallback(
    (eventName: string, value: number) => {
      if (!curComponentId) return;
      setSelectedComponent(getComponentById(value, components));
      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            componentId: value,
          },
        },
      });
    },
    [curComponentId, getComponentById, updateComponentProps]
  );

  //组件方法改变

  const componentMethodChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;

      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            method: value,
          },
        },
      });
    },
    [curComponentId, updateComponentProps]
  );

  //变量改变
  const variableChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;
      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            variable: value,
          },
        },
      });
    },
    [curComponentId, updateComponentProps]
  );

  //变量值改变
  const variableValueChange = useCallback(
    (eventName: string, value: string) => {
      if (!curComponentId) return;
      updateComponentProps(curComponentId, {
        [eventName]: {
          ...curComponent?.props?.[eventName],
          config: {
            ...curComponent?.props?.[eventName]?.config,
            value,
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
                    options={[
                      { label: "显示提示", value: "showMessage" },
                      { label: "组件方法", value: "componentFunction" },
                      { label: "设置变量", value: "setVariable" },
                    ]}
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

              {curComponent?.props?.[setting.name]?.type ===
                "componentFunction" && (
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>组件：</div>
                    <div>
                      <TreeSelect
                        className="w-[160px]"
                        treeData={components}
                        fieldNames={{
                          label: "name",
                          value: "id",
                        }}
                        onChange={(value) => {
                          componentChange(setting.name, value);
                        }}
                        value={
                          curComponent?.props?.[setting.name]?.config
                            ?.componentId
                        }
                      ></TreeSelect>
                    </div>
                  </div>
                  {componentMethodMap[selectedComponent?.name || ""] && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div>方法：</div>
                      <div>
                        <Select
                          className="w-[160px]"
                          options={componentMethodMap[
                            selectedComponent?.name || ""
                          ]?.map((method) => {
                            return { label: method.label, value: method.name };
                          })}
                          value={
                            curComponent?.props?.[setting.name]?.config?.method
                          }
                          onChange={(value) => {
                            componentMethodChange(setting?.name, value);
                          }}
                        ></Select>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {curComponent?.props?.[setting.name]?.type === "setVariable" && (
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>变量：</div>
                    <div>
                      <Select
                        className="w-[160px]"
                        options={variables?.map((item) => ({
                          label: item.remark,
                          value: item.name,
                        }))}
                        value={
                          curComponent?.props?.[setting.name]?.config?.variable
                        }
                        onChange={(value) => {
                          variableChange(setting.name, value);
                        }}
                      ></Select>
                    </div>
                  </div>
                  {curComponent?.props?.[setting.name]?.config?.variable && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div>值： </div>
                      <div>
                        <Input
                          className="w-[160px]"
                          value={
                            curComponent?.props?.[setting.name]?.config?.value
                          }
                          onChange={(e) => {
                            variableValueChange(setting.name, e.target.value);
                          }}
                        ></Input>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

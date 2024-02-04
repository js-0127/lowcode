import { SettingFormItemInput } from "@/editor/common/setting-form-item/input";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";
import { Form, Select } from "antd";
import { useEffect } from "react";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "id",
      label: "组件id",
      type: "input",
    },
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      options: [
        {
          value: "primary",
          label: "主按钮",
        },
        {
          label: "次按钮",
          value: "default",
        },
      ],
    },
    {
      name: "disabled",
      label: "是否禁用",
      type: "select",
      options: [
        {
          label: "禁用",
          value: true,
        },
        {
          label: "不禁用",
          value: false,
        },
      ],
    },
    {
      name: "text",
      label: "文本",
      type: "input",
    },
  ],
  [ItemType.Space]: [
    {
      name: "id",
      label: "组件id",
      type: "input",
    },
    {
      name: "size",
      label: "间距大小",
      type: "select",
      options: [
        {
          label: "大",
          value: "large",
        },
        {
          label: "中",
          value: "middle",
        },
        {
          label: "小",
          value: "small",
        },
      ],
    },
  ],
};
export const ComponentAttr: React.FC = () => {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponents();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ id: curComponentId, ...curComponent?.props });
  }, [curComponent, curComponentId]);
  /**
   * 动态渲染表单元素
   * @param setting 元素配置
   * @returns
   */
  function renderFormElement(setting: any) {
    const { type, options, name } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <SettingFormItemInput name={name} />;
    }
  }

  /**
   * 组件变化属性
   * @param changeValues
   */
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  if (!curComponent || !curComponentId) return null;

  return (
    <div className="pt-[20px]">
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        {(componentSettingMap[curComponent.name] || []).map((setting) => {
          return (
            <Form.Item
              key={setting.name}
              name={setting.name}
              label={setting.label}
            >
              {renderFormElement(setting)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

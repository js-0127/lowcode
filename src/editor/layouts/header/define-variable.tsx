import { Variable, useVariable } from "@/editor/stores/variable";
import { Modal, Form, Space, Input, Select, Button } from "antd";
import { useEffect, useCallback } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onCancle: () => void;
}
export const DefineVariableModal: React.FC<Props> = ({ open, onCancle }) => {
  const [form] = Form.useForm();

  const { variables, setVariables } = useVariable();

  const onFinish = (values: { variables: Variable[] }) => {
    setVariables(values.variables);
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ variables });
    }
  }, [open]);

  const onOk = useCallback(() => {
    form.submit();
    onCancle?.();
  }, [form, onCancle]);

  return (
    <Modal
      open={open}
      title="定义变量"
      destroyOnClose
      onCancel={onCancle}
      onOk={onOk}
      width={700}
    >
      <Form
        onFinish={onFinish}
        autoComplete="off"
        className="py-[20px]"
        form={form}
        initialValues={{ variables }}
      >
        <Form.List name="variables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...resetField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    rules={[{ required: true, message: "变量名不能为空" }]}
                    {...resetField}
                    name={[name, "name"]}
                  >
                    <Input placeholder="变量名" />
                  </Form.Item>

                  <Form.Item {...resetField} name={[name, "type"]}>
                    <Select
                      options={[{ label: "字符串", value: "string" }]}
                      placeholder="类型"
                    ></Select>
                  </Form.Item>
                  <Form.Item {...resetField} name={[name, "defaultValue"]}>
                    <Input placeholder="默认值" />
                  </Form.Item>
                  <Form.Item {...resetField} name={[name, "remark"]}>
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ type: "string" })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加变量
                </Button>
              </Form.Item>
              。
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

import { useVariable } from "@/editor/stores/variable";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";

interface Props {
  open: boolean;
  onCancle: () => void;
  onSelect: (record: any) => void;
}

export const SelectVariableModal: React.FC<Props> = ({
  open,
  onCancle,
  onSelect,
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: "变量名",
        dataIndex: "name",
      },
      {
        title: "变量值",
        dataIndex: "defaultValue",
      },
      {
        title: "备注",
        dataIndex: "remark",
      },
    ];
  }, []);

  const { variables } = useVariable();

  function rowSelect(record: any) {
    onSelect(record);
  }

  return (
    <Modal title="选择变量" width={800} open={open} onCancel={onCancle}>
      <Table
        columns={columns}
        dataSource={variables}
        rowKey={(record) => record.name}
        onRow={(record) => ({
          onClick: () => {
            rowSelect(record);
          },
        })}
      />
    </Modal>
  );
};

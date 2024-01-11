import { useComponents } from "@/editor/stores/components";
import { Modal, Tree } from "antd";

interface ComponentTreeProps {
  open: boolean;
  onCancle: () => void;
}

const ComponentTree: React.FC<ComponentTreeProps> = ({
  open,
  onCancle,
}: ComponentTreeProps) => {
  const { components, setCurComponentId } = useComponents();


  //选中高亮
  function selectComponent([selectKey]: any[]) {
    setCurComponentId(selectKey);
    onCancle && onCancle();
  }

  return (
    <Modal
      title="组件树"
      open={open}
      onCancel={onCancle}
      destroyOnClose
      footer={null}
    >
      <Tree
        fieldNames={{ title: "name", key: "id" }}
        treeData={components as any}
        showLine={true}
        defaultExpandAll
        onSelect={selectComponent}
      />
    </Modal>
  );
};

export default ComponentTree;

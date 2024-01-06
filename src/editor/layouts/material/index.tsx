import ComponentItem from "@/editor/common/component-item";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";

export const Material: React.FC = () => {
  const { addComponent } = useComponents();
  const onDragEnd = (dropResult: { name: string; id?: number; props: any }) => {
    addComponent(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        props: dropResult.props,
      },
      dropResult.id as number
    );
  };

  return (
    <div className="flex p-[10px] flex-wrap gap-4">
      <ComponentItem
        onDragEnd={onDragEnd}
        description="按钮"
        name={ItemType.Button}
      />
      <ComponentItem
        onDragEnd={onDragEnd}
        description="间距"
        name={ItemType.Space}
      />
    </div>
  );
};

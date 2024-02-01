import { ItemType } from "../item-type";
import { useDrag } from "react-dnd";

interface ComponentItemProps {
  name: string;
  description: string;
  onDragEnd: any;
}

const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  onDragEnd,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      const dragResult = monitor.getDropResult();
      if (!dragResult) {
        return;
      }
      onDragEnd &&
        onDragEnd({
          name,
          props: name === ItemType.Button ? { text: "按钮" } : {},
          ...dragResult,
        });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className="border-dashed border-[1px] border-[gray] bg-white cursor-move py-[8px] px-[20px] rounded-lg"
      style={{
        opacity,
      }}
    >
      {description}
    </div>
  );
};

export default ComponentItem;

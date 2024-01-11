import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header } from "./header";
import { Material } from "./material";
import { Stage } from "./renderer";
import { Setting } from "./setting";
import { useComponents } from "../stores/components";
import { ProdStage } from "./renderer/prod";
export const Layout: React.FC = () => {
  const { mode } = useComponents();
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[50px] flex items-center border-[1px] border-solid border-gray-300">
        <Header />
      </div>
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <Material />
          </Allotment.Pane>

          <Allotment.Pane>
            <Stage />
          </Allotment.Pane>

          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Allotment.Pane>
          <ProdStage />
        </Allotment.Pane>
      )}
    </div>
  );
};

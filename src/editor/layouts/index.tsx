import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header } from "./header";
import { Material } from "./material";
import { Stage } from "./renderer";
import { Setting } from "./setting";
export const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[50px] flex items-center bg-red-300">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
          <Material />
        </Allotment.Pane>

        <Allotment.Pane>
          <Stage />
        </Allotment.Pane>

        <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

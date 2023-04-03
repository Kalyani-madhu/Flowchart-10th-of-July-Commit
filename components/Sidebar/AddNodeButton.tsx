import nodeStore from "../Flow/Nodes/nodeStore";
import { MdOutlineAdd } from "react-icons/md";
function AddNodeButton() {
  const addNode = nodeStore((state) => state.addNode);
  const newww = {
    id: "6",
    data: { label: "New Node", shape: "rectangle" },
    position: { x: 400, y: 300 },
    type: "blueNode",
    draggable: true,
  };
  return (
    <div className="absolute bottom-48 right-10">
      <button
        type="button"
        className="inline-flex items-center rounded-3xl bg-blue-600 p-2.5 text-center text-sm
         text-white shadow-lg shadow-blue-300 transition-all hover:bg-blue-700 focus:outline-none dark:shadow-blue-800"
        onClick={() => addNode(newww)}
      >
        <MdOutlineAdd className="h-10 w-10" />
      </button>
    </div>
  );
}

export default AddNodeButton;

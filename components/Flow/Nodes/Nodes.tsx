import { Editing } from "../Editing";
import { SyntheticEvent, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import nodeStore from "./nodeStore";
import { nodeCSSMap, nodeShapeMap } from "./nodeTypes";
import { BiArrowToRight } from "react-icons/bi";
import fileStore from "../../TreeView/fileStore";
import { NodeRendererProps } from "react-arborist/dist/types";
import { MyData } from "../../TreeView/backend";
import edgeStore from "../Edges/edgeStore";

function PrototypicalNode(css_props: string, data: object, id: string) {
  const [editing, setEditing] = useState(false);
  const handlePositions: { [id: string]: Position } = {
    a: Position.Left,
    b: Position.Top,
    c: Position.Right,
    d: Position.Bottom,
  };
  const updateLabel = nodeStore((state) => state.updateLabel);
  const updateNodeType = nodeStore((state) => state.updateNodeType);
  const toggleDraggable = nodeStore((state) => state.toggleDraggable);
  const findFile = fileStore((state) => state.find_file);
  const updateNodes = nodeStore((state) => state.updateNodes);
  const updateEdges = edgeStore((state) => state.updateEdges);
  // @ts-ignore
  const label = data.label;
  // @ts-ignore
  const shapeCSS = nodeShapeMap[data.shape];
  // @ts-ignore
  const description = data.description;

  return (
    <div className={`bg-transparent p-1 py-2 rounded ${shapeCSS[0]} group`}>
      {
        // ? Loop to generate 4 handles
        Object.keys(handlePositions).map((key, _) => (
          <Handle
            type="source"
            key={key}
            className="handle"
            position={handlePositions[key]}
            id={key}
          />
        ))
      }
      <div
        className={`${css_props} font-sans ${
          shapeCSS[1]
        } font-normal mx-1 h-8 text-xs flex items-center justify-center border-b-2 border-r-2 shadow-md ${
          editing ? "cursor-default" : ""
        }`}
        onDoubleClick={() => {
          setEditing(true);
          toggleDraggable(id, false);
        }}
      >
        <div className={shapeCSS[2]}>
          {editing ? (
            <Editing
              isEdge={false}
              toggleDraggable={toggleDraggable}
              id={id}
              updateNodeType={updateNodeType}
              setEditing={setEditing}
              updateLabel={updateLabel}
              label={label}
              CSSMap={nodeCSSMap}
              description={description}
              bidirectionalArrows={false}
            />
          ) : (
            <p>{label}</p>
          )}
          {
            // @ts-ignore
            Object.keys(data.links) != 0 ? (
              <div
                className="absolute top-12 flex whitespace-pre-wrap left-36 text-gray-800 dark:text-white
           border rounded-lg p-1 underline bg-white hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  const x = findFile(Object.keys(data.links));

                  if (x.children == null) {
                    updateEdges(x.flowchart.edges);
                    updateNodes(x.flowchart.nodes);
                  }
                }}
              >
                {/* @ts-ignore */}
                {Object.values(data.links)}
                <BiArrowToRight className="w-4 h-4" />
              </div>
            ) : (
              <></>
            )
          }
        </div>
      </div>
    </div>
  );
}

//@ts-ignore
function BrightblueNode({ data, id }) {
  return PrototypicalNode(
    "border-node-blue-100 bg-node-blue-200 text-white",
    data,
    id
  );
}
//@ts-ignore
function blueNode({ data, id }) {
  return PrototypicalNode(
    "border-node-blue-100 bg-node-blue-50 text-node-blue-200",
    data,
    id
  );
}

//@ts-ignore
function BrightgreenNode({ data, id }) {
  return PrototypicalNode(
    "border-node-green-100 bg-node-green-200 text-white",
    data,
    id
  );
}
//@ts-ignore
function greenNode({ data, id }) {
  return PrototypicalNode(
    "border-node-green-100 bg-node-green-50 text-node-green-200",
    data,
    id
  );
}

//@ts-ignore
function BrightredNode({ data, id }) {
  return PrototypicalNode(
    "border-node-red-100 bg-node-red-200 text-white",
    data,
    id
  );
}
//@ts-ignore
function redNode({ data, id }) {
  return PrototypicalNode(
    "border-node-red-100 bg-node-red-50 text-node-red-200",
    data,
    id
  );
}
//@ts-ignore
function BrightorangeNode({ data, id }) {
  return PrototypicalNode(
    "border-node-orange-100 bg-node-orange-200 text-white",
    data,
    id
  );
}
//@ts-ignore
function orangeNode({ data, id }) {
  return PrototypicalNode(
    "border-node-orange-100 bg-node-orange-50 text-node-orange-200",
    data,
    id
  );
}
//@ts-ignore
function BrightpurpleNode({ data, id }) {
  return PrototypicalNode(
    "border-node-purple-100 bg-node-purple-200 text-white",
    data,
    id
  );
}
//@ts-ignore
function purpleNode({ data, id }) {
  return PrototypicalNode(
    "border-node-purple-100 bg-node-purple-50 text-node-purple-200",
    data,
    id
  );
}
export {
  BrightblueNode,
  blueNode,
  BrightgreenNode,
  greenNode,
  BrightredNode,
  redNode,
  BrightorangeNode,
  orangeNode,
  BrightpurpleNode,
  purpleNode,
};

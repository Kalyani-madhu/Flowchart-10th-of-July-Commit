import { useState } from "react";
import { Editing } from "../Editing";
import {
  getSmoothStepPath,
  getEdgeCenter,
  Position,
} from "react-flow-renderer";
import edgeStore from "./edgeStore";
const fO = 144;
const fOHeight = fO;
const fOWidth = fO + 100;

import { edgeCSSMap } from "./edgeTypes";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
}: {
  id: any;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  data: {
    label: string;
    pathCSS: string;
    boxCSS: string;
    bidirectional: boolean;
  };
  style: Object;
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(false);
  const updateLabel = edgeStore((state) => state.updateLabel);
  const updateEdgeType = edgeStore((state) => state.updateEdgeCSS);
  const markerFill = edgeStore((state) => state.markerFill);
  const markerStart = data.bidirectional
    ? `url(#arrow${data.pathCSS.split(" ")[2]})`
    : `url(#circle${data.pathCSS.split(" ")[2]})`;
  return (
    <>
      <defs>
        {[...markerFill].map((x, i) => (
          <>
            <marker
              id={"circle" + x}
              className={x}
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="3"
              markerHeight="3"
            >
              <circle cx="5" cy="5" r="5" />
            </marker>
            <marker
              id={"arrow" + x}
              className={x}
              viewBox="0 -5 10 10"
              refX="5"
              refY="0"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,-5L10,0L0,5"></path>
            </marker>
          </>
        ))}
      </defs>
      <path
        id={id}
        style={style}
        className={`react-flow__edge-path ${data.pathCSS} ${
          selected ? "!stroke-[5]" : ""
        }`}
        d={edgePath}
        markerStart={markerStart}
        markerEnd={`url(#arrow${data.pathCSS.split(" ")[2]})`}
        onClick={() => {
          setSelected(!selected);
        }}
        onDoubleClick={() => {
          setEditing(true);
        }}
      />
      <foreignObject
        // className="bg-red-200"
        width={fOWidth}
        height={fOHeight}
        x={edgeCenterX - fOWidth / 2}
        y={edgeCenterY - 145 / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="flex h-full items-center justify-center">
          {data.label.length != 0 ? (
            <div
              className={`rounded-lg !bg-white p-0.5 text-sm dark:!bg-neutral-900 ${data.boxCSS}`}
              onDoubleClick={() => {
                setEditing(true);
              }}
            >
              {editing ? (
                <div className="text-xs">
                  <Editing
                    isEdge={true}
                    toggleDraggable={() => {}}
                    id={id}
                    updateNodeType={updateEdgeType}
                    setEditing={setEditing}
                    updateLabel={updateLabel}
                    label={data.label}
                    CSSMap={edgeCSSMap}
                    description=""
                    bidirectionalArrows={data.bidirectional}
                  />
                </div>
              ) : (
                <p>{data.label}</p>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </foreignObject>
    </>
  );
}

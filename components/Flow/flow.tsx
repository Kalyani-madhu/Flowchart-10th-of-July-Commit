import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  ConnectionMode,
  useReactFlow,
} from "react-flow-renderer";
import { nodeTypeMap } from "./Nodes/nodeTypes";
import ConnectionLine from "./ConnectionLine";
import CustomControls from "./CustomControls";
import { edgeTypeMap } from "./Edges/edgeTypes";
import nodeStore from "./Nodes/nodeStore";
import edgeStore from "./Edges/edgeStore";

const defaultEdgeOptions = {
  type: "customEdge",
  data: {
    label: "New Edge",
    pathCSS: "!stroke-node-green-200 fill-node-green-200",
    boxCSS: "border-node-green-100 bg-node-green-50 text-node-green-200",
  },
};
const snapGrid: [number, number] = [10, 10];
function Flow() {
  const { getNodes, getEdges } = useReactFlow();
  const defaultNodes = nodeStore((state) => state.nodes);
  const defaultEdges = edgeStore((state) => state.edges);
  const updateEdges = edgeStore((state) => state.updateEdges);
  const updateNodes = nodeStore((state) => state.updateNodes);
  const deleteNode = nodeStore((state) => state.deleteNode);
  const [nodes, setNodes] = useState<Node[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>(defaultEdges);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => {
        updateEdges(getEdges());
        return addEdge(connection, eds);
      }),
    [setEdges, getEdges, updateEdges]
  );

  function onNodesDelete(nodes: Array<Node>) {
    for (let index = 0; index < nodes.length; index++) {
      const element = nodes[index];
      console.log(element.data.label);
      deleteNode(element);
    }
  }
  return (
    <div className="absolute -z-20 h-screen w-screen transition-all duration-100">
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // @ts-ignore
        connectionLineComponent={ConnectionLine}
        // snapToGrid
        snapGrid={snapGrid}
        zoomOnDoubleClick={false}
        // @ts-ignore
        edgeTypes={edgeTypeMap}
        // @ts-ignore
        nodeTypes={nodeTypeMap}
        connectionMode={ConnectionMode.Loose}
        onNodeDragStop={() => updateNodes(getNodes())}
        onNodesDelete={(selectedNodes) => onNodesDelete(selectedNodes)}
      >
        <MiniMap />
        <CustomControls />
      </ReactFlow>
    </div>
  );
}

export default Flow;

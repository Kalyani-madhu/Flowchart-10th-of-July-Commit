import create from "zustand";
import { Node } from "react-flow-renderer";
import nodes from "./flowchart1";

interface NodeState {
  nodes: Array<Node>;
  addNode: (newNode: Node) => void;
  updateNodes: (nodes: Array<Node>) => void;
  deleteNode: (node: Node) => void;
  updateLabel: (id: string, newLabel: string) => void;
  updateShape: (id: string, newShape: string) => void;
  updateNodeType: (id: string, newType: string) => void;
  updateLinks: (id: string, newLink: Object) => void;
  toggleDraggable: (id: string, draggable: boolean) => void;
}

const nodeStore = create<NodeState>((set) => ({
  nodes: nodes,
  addNode: (newNode) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        { ...newNode, id: Math.floor(Math.random() * 1000 + 1).toString() },
      ],
    })),
  updateNodes: (nodes) =>
    set((state) => {
      // const updated_nodes = state.nodes.map(obj => [node].find(o => o.id === obj.id) || obj); // ? This code is basically magic, but very cool
      return { nodes: nodes };
    }),
  deleteNode: (node) =>
    set((state) => {
      const updated_nodes = state.nodes.filter((item) => item.id !== node.id);
      return { nodes: updated_nodes };
    }),
  updateLabel: (id: string, newLabel: string) =>
    set((state) => {
      const old_node = state.nodes.filter((item) => item.id === id)[0];
      const to_be_updated = state.nodes.filter((item) => item.id !== id);
      //@ts-ignore
      const updated_node = {
        ...old_node,
        data: { ...old_node.data, label: newLabel },
      };
      return { nodes: [...to_be_updated, updated_node] };
    }),
  updateShape: (id: string, newShape: string) =>
    set((state) => {
      const old_node = state.nodes.filter((item) => item.id === id)[0];
      const to_be_updated = state.nodes.filter((item) => item.id !== id);
      //@ts-ignore
      const updated_node = {
        ...old_node,
        data: { ...old_node.data, shape: newShape },
      };
      return { nodes: [...to_be_updated, updated_node] };
    }),
  updateNodeType: (id: string, newType: string) =>
    set((state) => {
      const old_node = state.nodes.filter((item) => item.id === id)[0];
      const to_be_updated = state.nodes.filter((item) => item.id !== id);
      //@ts-ignore
      const updated_node = { ...old_node, type: newType };
      return { nodes: [...to_be_updated, updated_node] };
    }),
  updateLinks: (id, newLink) =>
    set((state) => {
      const old_node = state.nodes.filter((item) => item.id === id)[0];
      const to_be_updated = state.nodes.filter((item) => item.id !== id);
      //@ts-ignore
      const updated_node = {
        ...old_node,
        data: { ...old_node.data, links: newLink },
      };
      return { nodes: [...to_be_updated, updated_node] };
    }),
  toggleDraggable: (id: string, draggable: boolean) =>
    set((state) => {
      const old_node = state.nodes.filter((item) => item.id === id)[0];
      const to_be_updated = state.nodes.filter((item) => item.id !== id);
      //@ts-ignore
      const updated_node = { ...old_node, draggable: draggable };
      return { nodes: [...to_be_updated, updated_node] };
    }),
}));

export default nodeStore;
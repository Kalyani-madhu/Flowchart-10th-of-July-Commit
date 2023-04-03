import create from "zustand";
import TreeModel from "tree-model-improved";
import { MyData, findById } from "./backend";
import nodes1 from "../Flow/Nodes/flowchart1";
import nodes2 from "../Flow/Nodes/flowchart2";
import edges1 from "../Flow/Edges/flowchart1";
import edges2 from "../Flow/Edges/flowchart2";

const initData = {
  id: "ROOT",
  name: "ROOT",
  isOpen: true,
  children: [
    {
      id: "1",
      name: "Clients",
      isOpen: true,
      children: [
        {
          id: "4",
          name: "Projects",
          isOpen: true,
          children: [
            {
              id: "2",
              name: "Flowchart 1",
              flowchart: {
                nodes: nodes1,
                edges: edges1,
              },
              isOpen: true,
            },
            {
              id: "3",
              name: "Flowchart 2",
              flowchart: {
                nodes: nodes2,
                edges: edges2,
              },
            },
          ],
        },
      ],
    },
    {
      id: "6",
      name: "Other Projects",
      isOpen: true,
      children: [],
    },
  ],
};

function searchTree(element: any, matchingTitle: any): any {
  if (element.id == matchingTitle) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
}

interface files {
  data: MyData;
  linkNodes: { nodes: Object; fileID: string };
  updateLinkNodes: (nodes: Object) => void;
  add_file: () => void;
  add_folder: () => void;
  delete_item: (id: string) => void;
  find_file: (id: string) => MyData;
}

const fileStore = create<files>((set) => ({
  // @ts-ignore
  data: initData,
  linkNodes: { nodes: {}, fileID: "" },
  updateLinkNodes: (nodes) =>
    set((state) => {
      return { linkNodes: { nodes: nodes, fileID: state.linkNodes.fileID } };
    }),
  add_file: () =>
    set((state) => {
      state.data.children?.push({
        id: Math.floor(Math.random() * 1000 + 1).toString(),
        name: "New File",
        isOpen: true,
      });

      return { data: state.data };
    }),
  add_folder: () =>
    set((state) => {
      state.data.children?.push({
        id: Math.floor(Math.random() * 1000 + 1).toString(),
        name: "New Folder",
        isOpen: true,
        children: [],
      });

      return { data: state.data };
    }),
  // ? This function seems to work, but may contain bugs w.r.t. state
  delete_item: (id: string) =>
    set((state) => {
      const root = new TreeModel().parse(state.data);
      const node = findById(root, id);
      node?.drop();
      const x = searchTree(state.data, "1");
      console.log(x);
      // ? Figure out how to make this work
      // const nodes = nodeStore((state) => state.nodes);
      // console.log(nodes);

      return { data: state.data };
    }),
  find_file: (id: string) => {
    var x = {};
    set((state) => {
      // ? Replace this function with findById when I implement MongoDB
      const targetNode = searchTree(state.data, id);
      x = targetNode;
      return {};
    });
    return x as MyData;
  },
}));

export default fileStore;

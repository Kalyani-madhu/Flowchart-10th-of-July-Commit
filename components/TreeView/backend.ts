import { useCallback, useEffect, useMemo, useState } from "react";
import TreeModel from "tree-model-improved";
import fileStore from "./fileStore";

export function findById(node: any, id: string): TreeModel.Node<any> | null {
  return node.first((n: any) => n.model.id === id);
}

export type MyData = {
  id: string;
  isOpen: boolean;
  name: string;
  children?: Array<MyData>;
};

export function useBackend() {
  const initData = fileStore((state) => state.data);

  const [data, setData] = useState<MyData>(initData as MyData);
  const root = useMemo(() => new TreeModel().parse(data), [data]);
  const find = useCallback((id: any) => findById(root, id), [root]);
  const update = () => setData({ ...root.model });

  useEffect(() => {
    setData(initData);
    update();
  });
  return {
    data,
    onMove: (
      srcIds: string[],
      dstParentId: string | null,
      dstIndex: number
    ) => {
      for (const srcId of srcIds) {
        const src = find(srcId);
        const dstParent = dstParentId ? find(dstParentId) : root;
        if (!src || !dstParent) return;
        const newItem = new TreeModel().parse(src.model);
        dstParent.addChildAtIndex(newItem, dstIndex);
        src.drop();
      }
      update();
    },

    onToggle: (id: string, isOpen: boolean) => {
      const node = find(id);
      if (node) {
        node.model.isOpen = isOpen;
        update();
      }
    },

    onEdit: (id: string, name: string) => {
      const node = find(id);
      if (node) {
        node.model.name = name;
        update();
      }
    },
  };
}

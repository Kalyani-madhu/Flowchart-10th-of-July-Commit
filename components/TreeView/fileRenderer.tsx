import AutoSize from "react-virtualized-auto-sizer";
import { Tree, TreeApi } from "react-arborist";
import { TreeNode, TreeNode2 } from "./treeNode";
import { useBackend } from "./backend";

export function FileTree() {
  const backend = useBackend();
  return (
    <AutoSize>
      {(props: any) => (
        <Tree
          //@ts-ignore
          ref={(tree: TreeApi) => {
            // @ts-ignore
            global.tree = tree;
          }}
          data={backend.data}
          getChildren="children"
          isOpen="isOpen"
          hideRoot
          indent={24}
          onMove={backend.onMove}
          onToggle={backend.onToggle}
          onEdit={backend.onEdit}
          rowHeight={22}
          width={props.width}
          height={props.height}
        >
          {TreeNode}
        </Tree>
      )}
    </AutoSize>
  );
}

export function LinkTree() {
  const backend = useBackend();
  return (
    <AutoSize>
      {(props: any) => (
        <Tree
          //@ts-ignore
          ref={(tree: TreeApi) => {
            // @ts-ignore
            global.tree = tree;
          }}
          data={backend.data}
          getChildren="children"
          isOpen="isOpen"
          hideRoot
          indent={24}
          // onMove={backend.onMove}
          onToggle={backend.onToggle}
          // onEdit={backend.onEdit}
          rowHeight={22}
          width={props.width}
          height={props.height}
        >
          {TreeNode2}
        </Tree>
      )}
    </AutoSize>
  );
}

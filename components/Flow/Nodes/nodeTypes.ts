import * as k from "./Nodes";

const nodeStrings = [
  "BrightblueNode",
  "BrightgreenNode",
  "BrightredNode",
  "BrightorangeNode",
  "BrightpurpleNode",
  "blueNode",
  "greenNode",
  "redNode",
  "orangeNode",
  "purpleNode",
];

const nodeTypes = [
  k.BrightblueNode,
  k.BrightgreenNode,
  k.BrightredNode,
  k.BrightorangeNode,
  k.BrightpurpleNode,
  k.blueNode,
  k.greenNode,
  k.redNode,
  k.orangeNode,
  k.purpleNode,
];

const nodeCSS = [
  "border-node-blue-100 bg-node-blue-200",
  "border-node-green-100 bg-node-green-200",
  "border-node-red-100 bg-node-red-200",
  "border-node-orange-100 bg-node-orange-200",
  "border-node-purple-100 bg-node-purple-200",
  "border-node-blue-100 bg-node-blue-50",
  "border-node-green-100 bg-node-green-50",
  "border-node-red-100 bg-node-red-50",
  "border-node-orange-100 bg-node-orange-50",
  "border-node-purple-100 bg-node-purple-50",
];

const nodeTypeMap = Object.fromEntries(
  nodeStrings.map((_, i) => [nodeStrings[i], nodeTypes[i]])
);
const nodeCSSMap = Object.fromEntries(
  nodeStrings.map((_, i) => [nodeStrings[i], nodeCSS[i]])
);

const nodeShapeMap = {
  rectangle: ["w-40", "rounded-md", ""],
  diamond: [
    "h-36 w-36",
    "rotate-45 h-24 w-24 translate-x-4 translate-y-4 rounded-md",
    "-rotate-45",
  ],
  circle: ["h-30 w-30", "h-24 w-24 rounded-full", "rotate-0"],
};

export { nodeTypeMap, nodeCSSMap, nodeShapeMap };

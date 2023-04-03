import type { NextPage } from "next";
import Sidebar from "../components/Sidebar/Sidebar";
import Flow from "../components/Flow/flow";
import { ReactFlowProvider } from "react-flow-renderer";
import AddNodeButton from "../components/Sidebar/AddNodeButton";

const Home: NextPage = () => {
  return (
    <div>
      <Sidebar />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
      <AddNodeButton />
    </div>
  );
};

export default Home;

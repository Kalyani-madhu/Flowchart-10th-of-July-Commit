import { MdOutlineArrowForwardIos } from "react-icons/md";

function BCTile(name: string, isFirst: boolean = false) {
  return (
    <li>
      <div className="flex items-center">
        {isFirst ? null : <MdOutlineArrowForwardIos className="w-5 h-5" />}
        <button className="ml-2 text-xl w-48 whitespace-nowrap border-node-blue-100 bg-node-blue-50 text-node-blue-200 font-normal mx-1 flex items-center justify-center border-b-2 border-r-2 shadow-md p-2 rounded-xl hover:text-node-blue-50 hover:bg-node-blue-100 dark:text-gray-400 dark:hover:text-white">
          {name}
        </button>
      </div>
    </li>
  );
}

function BreadCrumbs() {
  return (
    <div className=" relative left-[25vw] top-5">
      <nav className="flex " aria-label="Breadcrumb">
        <ol className="flex space-x-3 py-2 pr-2">
          {BCTile("AWS", true)}
          {BCTile("Structure")}
          {BCTile("Lambda Functions")}
        </ol>
      </nav>
    </div>
  );
}

export default BreadCrumbs;

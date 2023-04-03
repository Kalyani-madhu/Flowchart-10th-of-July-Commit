import { MdGridOn } from "react-icons/md";
import { Controls, ControlButton } from "react-flow-renderer";
function CustomControls() {
  return (
    <Controls>
      {/* Make it toggle Grid snapping */}
      <ControlButton>
        <MdGridOn className="text-black" />
      </ControlButton>
    </Controls>
  );
}

export default CustomControls;

import { Vector3 } from "../Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "../Yuu API/Console";
import { registerStart } from "../Yuu API/RegisterStart";


console.log("[SampleDebug] module loaded");
registerStart(start);

function start() {
  console.log("[SampleDebug] start");
  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));
}

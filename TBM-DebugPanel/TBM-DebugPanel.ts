import { Vector3 } from "../Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "../Yuu API/Console";


console.log(`TBM-DebugPanel module loaded`);

export function registerDebugPanel() {
  console.log("[SampleDebug] start");
  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));
}


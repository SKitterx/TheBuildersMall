import { Vector3 } from "../Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "../Yuu API/Console";
import { registerStart } from "../Yuu API/RegisterStart";


let isRegistered = false;

export function registerDebugPanel() {
  if (isRegistered) {
    return;
  }

  isRegistered = true;
  registerStart(start);
}

function start() {
  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));

  console.log("Hello World!");
}

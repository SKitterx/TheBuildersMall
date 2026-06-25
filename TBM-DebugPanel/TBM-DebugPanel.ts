import { Quaternion } from "../Yuu API/Basic Types/Quaternion";
import { Vector3 } from "../Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "../Yuu API/Console";
import { Player } from "../Yuu API/Player";
import { registerStart } from "../Yuu API/RegisterStart";
import {
  createPaletteActionButton,
  createPaletteSection,
  createPalettePanel,
  createPaletteToggleChip,
  paletteTheme,
} from "../TBM-UI";


let isRegistered = false;
const debugTag = "[TBM-DebugPanel]";

console.log(`${debugTag} module loaded`);

export function registerDebugPanel() {
  console.log(`${debugTag} registerDebugPanel called`);

  if (isRegistered) {
    console.log(`${debugTag} registerDebugPanel skipped (already registered)`);
    return;
  }

  isRegistered = true;
  console.log(`${debugTag} registering start callback`);
  registerStart(start);
}

registerDebugPanel();

function start() {
  console.log(`${debugTag} start begin`);

  const { pos, rot } = getPanelTransform();
  console.log(`${debugTag} panel transform`, { pos, rot });

  console.log(`${debugTag} creating palette panel`);
  const panel = createPalettePanel({
    eyebrow: "TBM",
    footerText: "Trigger = select  |  Panel = debug tools",
    pos,
    rot,
    subtitle: "Quick controls for testing\nand live debugging.",
    title: "Debug Panel",
  });
  console.log(`${debugTag} palette panel created`, panel);

  console.log(`${debugTag} creating runtime section`);
  const runtimeSection = createPaletteSection({
    parent: panel.contentRoot,
    pos: new Vector3(0, 0.062, 0.002),
    subtitle: "Panel visibility and quick probes.",
    title: "Runtime",
  });
  console.log(`${debugTag} runtime section created`, runtimeSection);

  createPaletteToggleChip({
    initialValue: true,
    label: "World Console",
    onValueChanged: (value) => {
      console.log(`${debugTag} world console toggle changed`, { value });
      inWorldConsole.visible(value, pos.add(new Vector3(0, 0.08, -0.06)), rot);
    },
    parent: runtimeSection,
    pos: new Vector3(-0.14, 0.018, 0.002),
    scale: new Vector3(0.14, 0.04, 1),
  });
  console.log(`${debugTag} world console toggle created`);

  createPaletteActionButton({
    backgroundColor: paletteTheme.accentSoft,
    fontSize: 2.3,
    onClick: () => {
      console.log(`${debugTag} log ping clicked`);
      const playerPos = Player.position.get();
      const playerRot = Player.rotation.get();

      console.log("TBM debug ping", {
        playerPos,
        playerRot,
      });
    },
    parent: runtimeSection,
    pos: new Vector3(0.03, 0.018, 0.002),
    scale: new Vector3(0.13, 0.04, 1),
    text: "Log Ping",
    textColor: paletteTheme.text,
  });
  console.log(`${debugTag} log ping button created`);

  createPaletteActionButton({
    backgroundColor: paletteTheme.surfaceRaised,
    fontSize: 2.3,
    onClick: () => {
      console.log(`${debugTag} reapply pose clicked`);
      const playerPos = Player.position.get();
      const playerRot = Player.rotation.get();

      if (playerPos && playerRot) {
        console.log(`${debugTag} reapplying player pose`, { playerPos, playerRot });
        Player.rotation.set(playerRot);
        Player.position.set(playerPos);
      } else {
        console.log(`${debugTag} cannot reapply pose`, { playerPos, playerRot });
      }
    },
    parent: runtimeSection,
    pos: new Vector3(0.03, -0.034, 0.002),
    scale: new Vector3(0.13, 0.04, 1),
    text: "Reapply Pose",
    textColor: paletteTheme.text,
  });

  console.log(`${debugTag} reapply pose button created`);
  console.log(`${debugTag} start complete`);
}

function getPanelTransform(): { pos: Vector3; rot: Quaternion } {
  console.log(`${debugTag} resolving panel transform`);
  const headPos = Player.head.position.get();
  const headRot = Player.head.rotation.get();

  console.log(`${debugTag} head transform read`, { headPos, headRot });

  const transform = {
    pos: headPos ? headPos.add(new Vector3(0, 0.02, -0.65)) : new Vector3(0, 1.45, -1.2),
    rot: headRot ?? Quaternion.one,
  };

  console.log(`${debugTag} panel transform resolved`, transform);
  return transform;
}

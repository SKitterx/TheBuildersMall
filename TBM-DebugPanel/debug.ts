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

export function registerDebugPanel() {
  if (isRegistered) {
    return;
  }

  isRegistered = true;
  registerStart(start);
}

function start() {
  const { pos, rot } = getPanelTransform();
  const panel = createPalettePanel({
    eyebrow: "TBM",
    footerText: "Trigger = select  |  Panel = debug tools",
    pos,
    rot,
    subtitle: "Quick controls for testing\nand live debugging.",
    title: "Debug Panel",
  });

  const runtimeSection = createPaletteSection({
    parent: panel.contentRoot,
    pos: new Vector3(0, 0.062, 0.002),
    subtitle: "Panel visibility and quick probes.",
    title: "Runtime",
  });

  createPaletteToggleChip({
    initialValue: true,
    label: "World Console",
    onValueChanged: (value) => {
      inWorldConsole.visible(value, pos.add(new Vector3(0, 0.08, -0.06)), rot);
    },
    parent: runtimeSection,
    pos: new Vector3(-0.14, 0.018, 0.002),
    scale: new Vector3(0.14, 0.04, 1),
  });

  createPaletteActionButton({
    backgroundColor: paletteTheme.accentSoft,
    fontSize: 2.3,
    onClick: () => {
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

  createPaletteActionButton({
    backgroundColor: paletteTheme.surfaceRaised,
    fontSize: 2.3,
    onClick: () => {
      const playerPos = Player.position.get();
      const playerRot = Player.rotation.get();

      if (playerPos && playerRot) {
        Player.rotation.set(playerRot);
        Player.position.set(playerPos);
      }
    },
    parent: runtimeSection,
    pos: new Vector3(0.03, -0.034, 0.002),
    scale: new Vector3(0.13, 0.04, 1),
    text: "Reapply Pose",
    textColor: paletteTheme.text,
  });
}

function getPanelTransform(): { pos: Vector3; rot: Quaternion } {
  const headPos = Player.head.position.get();
  const headRot = Player.head.rotation.get();

  return {
    pos: headPos ? headPos.add(new Vector3(0, 0.02, -0.65)) : new Vector3(0, 1.45, -1.2),
    rot: headRot ?? Quaternion.one,
  };
}

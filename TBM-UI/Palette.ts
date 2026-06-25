import { Color } from "../Yuu API/Basic Types/Color";
import { Quaternion } from "../Yuu API/Basic Types/Quaternion";
import { Vector3 } from "../Yuu API/Basic Types/Vector3";
import { createUIElement } from "../Yuu API/CreateUIElement";
import { Entity } from "../Yuu API/Entity";
import { spawnPrimitive } from "../Yuu API/SpawnPrimitive";


export const paletteTheme = {
  text: new Color(0.1, 0.13, 0.19),
  mutedText: new Color(0.34, 0.39, 0.5),
  panel: new Color(0.95, 0.97, 1),
  header: new Color(0.14, 0.19, 0.29),
  surface: new Color(0.88, 0.91, 0.97),
  surfaceRaised: new Color(0.92, 0.95, 1),
  card: new Color(0.97, 0.98, 1),
  accent: new Color(0.2, 0.52, 0.9),
  accentSoft: new Color(0.83, 0.9, 1),
  accentMuted: new Color(0.62, 0.74, 0.92),
  success: new Color(0.2, 0.63, 0.44),
  danger: new Color(0.76, 0.33, 0.33),
  shadow: new Color(0.06, 0.08, 0.13),
};

export type PaletteLabelOptions = {
  color: Color,
  fontSize: number,
  outlineColor: Color,
  parent: Entity,
  pos: Vector3,
  text: string,
};

export type PaletteButtonOptions = {
  backgroundColor: Color,
  fontSize: number,
  parent: Entity | undefined,
  pos: Vector3,
  scale: Vector3,
  text: string,
  textColor: Color,
};

export type PaletteActionButtonOptions = {
  activeColor?: Color,
  backgroundColor?: Color,
  fontSize?: number,
  onClick?: () => void,
  parent: Entity,
  pos: Vector3,
  scale: Vector3,
  text: string,
  textColor?: Color,
};

export type PaletteToggleChipOptions = {
  activeColor?: Color,
  inactiveColor?: Color,
  initialValue?: boolean,
  label: string,
  onValueChanged?: (value: boolean) => void,
  parent: Entity,
  pos: Vector3,
  scale?: Vector3,
};

export type PaletteCardOptions = {
  accentColor?: Color,
  actionText?: string,
  index: number,
  onClick: () => void,
  parent: Entity,
  subtitle: string,
  title: string,
};

export type PaletteSectionOptions = {
  eyebrow?: string,
  parent: Entity,
  pos: Vector3,
  subtitle?: string,
  title: string,
};

export type PalettePanelOptions = {
  eyebrow?: string,
  footerText?: string,
  pos: Vector3,
  rot: Quaternion,
  subtitle?: string,
  title: string,
};

export type PaletteFrame = {
  contentRoot: Entity,
  footerRoot: Entity,
  headerRoot: Entity,
  root: Entity,
};

export type PaletteButtonHandle = {
  label: Entity,
  root: Entity,
  setBackgroundColor: (color: Color) => void,
  setText: (text: string) => void,
  setTextColor: (color: Color) => void,
};

export type PaletteToggleChipHandle = {
  button: PaletteButtonHandle,
  getValue: () => boolean,
  root: Entity,
  setValue: (value: boolean) => void,
};

export type PaletteScrollListHandle<T> = {
  render: () => void,
  root: Entity,
  scrollBy: (direction: number) => void,
  setItems: (items: T[]) => void,
};

export type PaletteScrollListOptions<T> = {
  createItem: (args: { index: number, item: T, parent: Entity }) => Entity,
  itemSpacing: number,
  items: T[],
  listOffset?: Vector3,
  onPageChanged?: (page: number, totalPages: number) => void,
  parent: Entity,
  visibleCount: number,
};

export function createPaletteFrame(pos: Vector3, rot: Quaternion): { listRoot: Entity, root: Entity, scrollInfoText: Entity } {
  const panel = createPalettePanel({
    eyebrow: "Shaders",
    footerText: "Trigger = select  |  X = toggle palette",
    pos,
    rot,
    subtitle: "Pin a test to the world,\nthen point and trigger.",
    title: "Shader Palette",
  });

  const listRoot = new Entity(new Vector3(0, -0.01, 0.003), Quaternion.one, Vector3.one, panel.contentRoot, 'Static');
  const scrollInfoText = addLabel({
    color: paletteTheme.mutedText,
    fontSize: 2.2,
    outlineColor: paletteTheme.panel,
    parent: panel.footerRoot,
    pos: new Vector3(0, 0.03, 0.002),
    text: '',
  });

  return { listRoot, root: panel.root, scrollInfoText };
}

export function createPalettePanel(options: PalettePanelOptions): PaletteFrame {
  const root = spawnPrimitive.plane(
    'Front',
    options.pos,
    new Vector3(0.44, 0.36, 1),
    options.rot,
    paletteTheme.panel,
    0.96,
    'None',
    'Static',
    undefined,
  );

  spawnPrimitive.plane(
    'Front',
    new Vector3(0, 0, -0.001),
    new Vector3(0.46, 0.38, 1),
    Quaternion.one,
    paletteTheme.shadow,
    0.14,
    'None',
    'Static',
    root,
  );

  const headerRoot = new Entity(new Vector3(0, 0.08, 0.001), Quaternion.one, Vector3.one, root, 'Static');
  spawnPrimitive.plane(
    'Front',
    Vector3.zero,
    new Vector3(0.44, 0.09, 1),
    Quaternion.one,
    paletteTheme.header,
    1,
    'None',
    'Static',
    headerRoot,
  );

  const contentRoot = new Entity(new Vector3(0, -0.02, 0.001), Quaternion.one, Vector3.one, root, 'Static');
  spawnPrimitive.plane(
    'Front',
    Vector3.zero,
    new Vector3(0.38, 0.205, 1),
    Quaternion.one,
    paletteTheme.surface,
    1,
    'None',
    'Static',
    contentRoot,
  );

  const footerRoot = new Entity(new Vector3(0, -0.145, 0.001), Quaternion.one, Vector3.one, root, 'Static');

  if (options.eyebrow) {
    addLabel({
      color: new Color(0.72, 0.8, 0.95),
      fontSize: 2.5,
      outlineColor: paletteTheme.panel,
      parent: headerRoot,
      pos: new Vector3(-0.14, 0.046, 0.001),
      text: options.eyebrow,
    });
  }

  addLabel({
    color: Color.white,
    fontSize: 4.2,
    outlineColor: paletteTheme.header,
    parent: headerRoot,
    pos: new Vector3(-0.075, 0.008, 0.001),
    text: options.title,
  });

  if (options.subtitle) {
    addLabel({
      color: new Color(0.83, 0.88, 0.95),
      fontSize: 2.1,
      outlineColor: paletteTheme.header,
      parent: headerRoot,
      pos: new Vector3(-0.03, -0.034, 0.001),
      text: options.subtitle,
    });
  }

  if (options.footerText) {
    addLabel({
      color: paletteTheme.mutedText,
      fontSize: 2.0,
      outlineColor: paletteTheme.panel,
      parent: footerRoot,
      pos: new Vector3(-0.02, -0.025, 0.001),
      text: options.footerText,
    });
  }

  return { contentRoot, footerRoot, headerRoot, root };
}

export function createPaletteSection(options: PaletteSectionOptions): Entity {
  const section = new Entity(options.pos, Quaternion.one, Vector3.one, options.parent, 'Static');

  if (options.eyebrow) {
    addLabel({
      color: paletteTheme.accent,
      fontSize: 2.0,
      outlineColor: paletteTheme.surface,
      parent: section,
      pos: new Vector3(-0.145, 0.036, 0.001),
      text: options.eyebrow,
    });
  }

  addLabel({
    color: paletteTheme.text,
    fontSize: 3.0,
    outlineColor: paletteTheme.surface,
    parent: section,
    pos: new Vector3(-0.115, 0.002, 0.001),
    text: options.title,
  });

  if (options.subtitle) {
    addLabel({
      color: paletteTheme.mutedText,
      fontSize: 1.9,
      outlineColor: paletteTheme.surface,
      parent: section,
      pos: new Vector3(-0.075, -0.03, 0.001),
      text: options.subtitle,
    });
  }

  return section;
}

export function createPaletteButton(options: PaletteButtonOptions): Entity {
  return createUIElement.button(
    options.pos,
    options.scale,
    Quaternion.one,
    options.text,
    options.textColor,
    options.fontSize,
    options.backgroundColor,
    options.parent,
  );
}

export function createPaletteActionButton(options: PaletteActionButtonOptions): PaletteButtonHandle {
  const backgroundColor = options.backgroundColor ?? paletteTheme.accentSoft;
  const textColor = options.textColor ?? paletteTheme.text;
  const button = createPaletteButton({
    backgroundColor,
    fontSize: options.fontSize ?? 2.8,
    parent: options.parent,
    pos: options.pos,
    scale: options.scale,
    text: '',
    textColor,
  });

  const label = new Entity(new Vector3(0, 0, 0.002), Quaternion.one, Vector3.one, button, 'Static');
  label.text.create(options.text, options.fontSize ?? 2.8, 0);
  label.text.doubleSided.set(false);
  label.text.color.set(textColor);
  label.text.outline.set(1);
  label.text.outline.color.set(backgroundColor);

  if (options.onClick) {
    button.rayClick.setClickFunction(() => {
      options.onClick?.();
    });
  }

  return {
    label,
    root: button,
    setBackgroundColor: (color: Color) => {
      button.mesh.color.set(color, 1);
      label.text.outline.color.set(color);
    },
    setText: (text: string) => {
      label.text.display.set(text);
    },
    setTextColor: (color: Color) => {
      label.text.color.set(color);
    },
  };
}

export function createPaletteToggleChip(options: PaletteToggleChipOptions): PaletteToggleChipHandle {
  let currentValue = options.initialValue ?? false;

  const button = createPaletteActionButton({
    backgroundColor: options.inactiveColor ?? paletteTheme.surfaceRaised,
    fontSize: 2.35,
    onClick: () => {
      setValue(!currentValue);
      options.onValueChanged?.(currentValue);
    },
    parent: options.parent,
    pos: options.pos,
    scale: options.scale ?? new Vector3(0.12, 0.04, 1),
    text: '',
    textColor: paletteTheme.text,
  });

  function getDisplayText(): string {
    return `${options.label}: ${currentValue ? 'On' : 'Off'}`;
  }

  function applyState() {
    button.setText(getDisplayText());
    button.setBackgroundColor(currentValue ? (options.activeColor ?? paletteTheme.success) : (options.inactiveColor ?? paletteTheme.surfaceRaised));
    button.setTextColor(currentValue ? Color.white : paletteTheme.text);
  }

  function setValue(value: boolean) {
    currentValue = value;
    applyState();
  }

  applyState();

  return {
    button,
    getValue: () => currentValue,
    root: button.root,
    setValue,
  };
}

export function createPaletteCard(options: PaletteCardOptions): Entity {
  const card = spawnPrimitive.plane(
    'Front',
    new Vector3(0, 0.058 - (options.index * 0.082), 0),
    new Vector3(0.3, 0.066, 1),
    Quaternion.one,
    paletteTheme.card,
    1,
    'Concave',
    'Static',
    options.parent,
  );
  card.rayClick.initialize(false);
  card.rayClick.setClickFunction(() => {
    options.onClick();
  });

  spawnPrimitive.plane(
    'Front',
    new Vector3(-0.112, 0, 0.001),
    new Vector3(0.012, 0.066, 1),
    Quaternion.one,
    options.accentColor ?? paletteTheme.accent,
    1,
    'None',
    'Static',
    card,
  );
  spawnPrimitive.plane(
    'Front',
    new Vector3(0.087, 0, 0.001),
    new Vector3(0.07, 0.042, 1),
    Quaternion.one,
    paletteTheme.accentSoft,
    1,
    'None',
    'Static',
    card,
  );

  addLabel({
    color: paletteTheme.text,
    fontSize: 3.0,
    outlineColor: paletteTheme.card,
    parent: card,
    pos: new Vector3(-0.018, 0.013, 0.002),
    text: options.title,
  });
  addLabel({
    color: paletteTheme.mutedText,
    fontSize: 1.8,
    outlineColor: paletteTheme.card,
    parent: card,
    pos: new Vector3(-0.008, -0.013, 0.002),
    text: options.subtitle,
  });
  addLabel({
    color: paletteTheme.accent,
    fontSize: 2.4,
    outlineColor: paletteTheme.accentSoft,
    parent: card,
    pos: new Vector3(0.086, 0, 0.002),
    text: options.actionText ?? 'Run',
  });

  return card;
}

export function createPaletteScrollList<T>(options: PaletteScrollListOptions<T>): PaletteScrollListHandle<T> {
  const root = new Entity(options.listOffset ?? Vector3.zero, Quaternion.one, Vector3.one, options.parent, 'Static');
  let items = [...options.items];
  let cardEntities: Entity[] = [];
  let scrollIndex = 0;

  function updatePageInfo() {
    const totalPages = Math.max(1, Math.ceil(items.length / options.visibleCount));
    const currentPage = Math.floor(scrollIndex / options.visibleCount) + 1;
    options.onPageChanged?.(currentPage, totalPages);
  }

  function render() {
    cardEntities.forEach((entity) => {
      entity.destroy();
    });
    cardEntities = [];

    const visibleItems = items.slice(scrollIndex, scrollIndex + options.visibleCount);
    visibleItems.forEach((item, index) => {
      const builtItem = options.createItem({
        index,
        item,
        parent: root,
      });
      cardEntities.push(builtItem);
    });

    updatePageInfo();
  }

  function setItems(nextItems: T[]) {
    items = [...nextItems];
    scrollIndex = 0;
    render();
  }

  function scrollBy(direction: number) {
    const maxIndex = Math.max(0, items.length - options.visibleCount);
    scrollIndex = Math.max(0, Math.min(maxIndex, scrollIndex + direction));
    render();
  }

  render();

  return {
    render,
    root,
    scrollBy,
    setItems,
  };
}

export function addLabel(options: PaletteLabelOptions): Entity {
  const label = new Entity(options.pos, Quaternion.one, Vector3.one, options.parent, 'Static');
  label.text.create(options.text, options.fontSize, 0);
  label.text.doubleSided.set(false);
  label.text.color.set(options.color);
  label.text.outline.set(1);
  label.text.outline.color.set(options.outlineColor);
  return label;
}

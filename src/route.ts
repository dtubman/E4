export type EnemyKind = "drone" | "dart" | "turret" | "lancer";

export type Formation = "line" | "vee" | "column" | "pincer";

export interface Wave {
  kind: EnemyKind;
  count: number;
  at: number;
  formation: Formation;
  x?: number;
}

export interface Sector {
  name: string;
  subtitle: string;
  length: number;
  waves: Wave[];
}

export const GRACE_TICKS = 240;

const BOSS_STOP = "The Warden";

export const SECTORS: Sector[] = [
  {
    name: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      { kind: "drone", count: 4, at: 60, formation: "line" },
      { kind: "drone", count: 5, at: 360, formation: "vee", x: 168 },
      { kind: "drone", count: 5, at: 660, formation: "vee", x: 312 },
      { kind: "drone", count: 6, at: 960, formation: "line" },
      { kind: "drone", count: 4, at: 1200, formation: "column", x: 120 },
      { kind: "drone", count: 4, at: 1260, formation: "column", x: 360 },
    ],
  },
  {
    name: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      { kind: "drone", count: 6, at: 60, formation: "vee" },
      { kind: "dart", count: 4, at: 300, formation: "line" },
      { kind: "dart", count: 5, at: 600, formation: "column", x: 144 },
      { kind: "dart", count: 5, at: 720, formation: "column", x: 336 },
      { kind: "drone", count: 7, at: 1020, formation: "line" },
      { kind: "dart", count: 5, at: 1140, formation: "vee" },
      { kind: "dart", count: 6, at: 1440, formation: "line" },
    ],
  },
  {
    name: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      { kind: "turret", count: 1, at: 60, formation: "line" },
      { kind: "drone", count: 6, at: 240, formation: "vee" },
      { kind: "turret", count: 2, at: 540, formation: "line" },
      { kind: "dart", count: 6, at: 840, formation: "column" },
      { kind: "turret", count: 2, at: 1080, formation: "line" },
      { kind: "drone", count: 6, at: 1140, formation: "line" },
      { kind: "turret", count: 3, at: 1500, formation: "line" },
    ],
  },
  {
    name: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      { kind: "lancer", count: 4, at: 60, formation: "pincer" },
      { kind: "dart", count: 6, at: 360, formation: "vee" },
      { kind: "lancer", count: 6, at: 600, formation: "pincer" },
      { kind: "turret", count: 2, at: 780, formation: "line" },
      { kind: "lancer", count: 6, at: 1140, formation: "pincer" },
      { kind: "drone", count: 8, at: 1260, formation: "vee" },
      { kind: "dart", count: 8, at: 1560, formation: "line" },
    ],
  },
  {
    name: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      { kind: "turret", count: 3, at: 60, formation: "line" },
      { kind: "lancer", count: 6, at: 180, formation: "pincer" },
      { kind: "dart", count: 6, at: 540, formation: "column", x: 120 },
      { kind: "dart", count: 6, at: 540, formation: "column", x: 360 },
      { kind: "drone", count: 9, at: 900, formation: "vee" },
      { kind: "turret", count: 2, at: 1020, formation: "line" },
      { kind: "lancer", count: 8, at: 1320, formation: "pincer" },
      { kind: "dart", count: 8, at: 1560, formation: "vee" },
    ],
  },
];

export const ROUTE_NAMES: string[] = [
  ...SECTORS.map((sector) => sector.name),
  BOSS_STOP,
];

export interface Slot {
  delay: number;
  x: number;
  y: number;
  side: number;
}

const MID_SCREEN = 240;

export function place(wave: Wave, i: number): Slot {
  const x = wave.x ?? MID_SCREEN;
  const offset = i - (wave.count - 1) / 2;
  const side = i % 2 === 0 ? 1 : -1;
  switch (wave.formation) {
    case "line":
      return { delay: 0, x: x + offset * 64, y: -30, side };
    case "vee":
      return {
        delay: Math.abs(offset) * 10,
        x: x + offset * 44,
        y: -30,
        side,
      };
    case "column":
      return { delay: i * 24, x, y: -30, side };
    case "pincer":
      return {
        delay: Math.floor(i / 2) * 30,
        x: side === 1 ? -30 : 510,
        y: 70 + Math.floor(i / 2) * 50,
        side,
      };
  }
}

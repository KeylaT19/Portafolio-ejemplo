export const FPS_S = 30;
export const secS = (s: number) => Math.round(s * FPS_S);

export const TRANSITION_FRAMES_S = 15; // 0.5s crossfade between every scene

export type CaptionSpec = {
  text: string;
  from: number; // seconds, relative to clip start
  duration: number; // seconds
};

export type ClipSpecS = {
  type: "video" | "image";
  src: string;
  duration: number; // seconds
  tag: string; // pill above the description text
  captions: CaptionSpec[];
};

export const MAIN_TITLE_S = "Cómo agregarte como suplente en una partida";
export const CLOSING_TITLE_S = "Así de fácil te unes como suplente a una partida";

export const TITLE_DURATION_S = 9;
export const CLOSING_DURATION_S = 9.7;

export const CLIPS_S: ClipSpecS[] = [
  {
    type: "video",
    src: "videos/suplente_inicio.mp4",
    duration: 6.8,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "En Inicio revisa las reservas del día: en juego, bloqueadas o disponibles.",
        from: 0,
        duration: 6.8,
      },
    ],
  },
  {
    type: "video",
    src: "videos/suplente_unirse.mp4",
    duration: 5.5,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Si una partida ya está en juego, tócala y confirma “Sí, unirme” para agregarte como suplente.",
        from: 0,
        duration: 5.5,
      },
    ],
  },
  {
    type: "image",
    src: "videos/suplente_exito.png",
    duration: 13,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Listo: ya quedaste registrado como suplente de esa partida.",
        from: 0,
        duration: 13,
      },
    ],
  },
];

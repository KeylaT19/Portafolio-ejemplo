import { ClipSpec } from "./captionTypes";

export const FPS_S = 30;
export const secS = (s: number) => Math.round(s * FPS_S);

export const TRANSITION_FRAMES_S = 15; // 0.5s crossfade between every scene

export type ClipSpecS = ClipSpec;

export const MAIN_TITLE_S = "Cómo agregarte como suplente y salir de una partida";
export const CLOSING_TITLE_S = "Así de fácil te unes o sales de una partida";

export const TITLE_DURATION_S = 209 / 30;
export const CLOSING_DURATION_S = 209 / 30;

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
    duration: 6,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Listo: ya quedaste registrado como suplente de esa partida.",
        from: 0,
        duration: 6,
      },
    ],
  },
  {
    type: "video",
    src: "videos/juegos_salir_26s.mp4",
    duration: 26.4,
    tag: "Pantalla de Mis Juegos",
    captions: [
      {
        text: "Para salir de una partida, entra al detalle y toca “Salir de la partida”.",
        from: 0,
        duration: 15,
      },
      {
        text: "También puedes salir directo desde la lista, sin entrar al detalle. Solo dale clic al botón de “Salir de la partida”.",
        from: 15,
        duration: 11.4,
      },
    ],
  },
];

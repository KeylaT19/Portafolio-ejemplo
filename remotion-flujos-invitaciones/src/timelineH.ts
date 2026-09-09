import { ClipSpec } from "./captionTypes";

export const FPS_H = 30;
export const secH = (s: number) => Math.round(s * FPS_H);

export const TRANSITION_FRAMES = 15; // 0.5s crossfade between every scene

export type ClipSpecH = ClipSpec;

export const MAIN_TITLE = "Cómo aceptar y salir de tus grupos y partidas";
export const CLOSING_TITLE = "Así de fácil aceptas y sales de tus grupos y partidas";

export const TITLE_DURATION_H = 6.8;
export const CLOSING_DURATION_H = 6.8;

export const CLIPS_H: ClipSpecH[] = [
  {
    type: "video",
    src: "videos/grupos_inicio.mp4",
    duration: 16,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Cuando te invitan a una partida privada o a un grupo, la invitación aparece directo en la pantalla de Inicio.",
        from: 0,
        duration: 8,
      },
      {
        text: "Puedes Aceptar o Rechazar ahí mismo, sin salir de Inicio.",
        from: 8,
        duration: 8,
      },
    ],
  },
  {
    type: "video",
    src: "videos/grupos_lista_aceptar.mp4",
    duration: 11,
    tag: "Pantalla de Mis Grupos",
    captions: [
      {
        text: "También puedes ver y Aceptar tus invitaciones desde la pantalla de Mis Grupos.",
        from: 0,
        duration: 11,
      },
    ],
  },
  {
    type: "video",
    src: "videos/grupos_detalle_aceptar.mp4",
    duration: 15,
    tag: "Pantalla de Mis Grupos",
    captions: [
      { text: "O entra al detalle del grupo antes de decidir.", from: 0, duration: 9 },
      {
        text: "Ahí también puedes tocar “Aceptar” para confirmar tu participación.",
        from: 9,
        duration: 6,
      },
    ],
  },
  {
    type: "video",
    src: "videos/grupos_salir.mp4",
    duration: 18.5,
    tag: "Pantalla de Mis Grupos",
    captions: [
      {
        text: "Para salir de un grupo, usa el ícono de salida junto al grupo en la lista…",
        from: 0,
        duration: 5,
      },
      {
        text: "También puedes entrar al detalle para confirmar que es el grupo correcto y tocar el botón “Salir del grupo”.",
        from: 5,
        duration: 13.5,
      },
    ],
  },
  {
    type: "video",
    src: "videos/juegos_lista_aceptar.mp4",
    duration: 14.3,
    tag: "Pantalla de Mis Juegos",
    captions: [
      {
        text: "En Mis Juegos ves tus reservaciones: las cerradas y las que están por confirmar.",
        from: 0,
        duration: 6,
      },
      {
        text: "Entra al detalle de una reservación por confirmar, para ver a los jugadores y aceptar o rechazar la invitación.",
        from: 6,
        duration: 8.3,
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
  {
    type: "image",
    src: "videos/juegos_vacio.png",
    duration: 3,
    tag: "Pantalla de Mis Juegos",
    captions: [
      {
        text: "También puedes salir directo desde la lista, sin entrar al detalle. Solo dale clic al botón de “Salir de la partida”.",
        from: 0,
        duration: 3,
      },
    ],
  },
];

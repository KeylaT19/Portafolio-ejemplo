export const FPS_H = 30;
export const secH = (s: number) => Math.round(s * FPS_H);

export const TRANSITION_FRAMES = 15; // 0.5s crossfade between every scene

export type CaptionSpec = {
  text: string;
  from: number; // seconds, relative to clip start
  duration: number; // seconds
};

export type ClipSpecH = {
  type: "video" | "image";
  src: string;
  duration: number; // seconds (raw, before transition trims)
  step: string; // short step label, e.g. "INICIO"
  captions: CaptionSpec[];
};

export type SectionSpecH = {
  tag: string;
  title: string;
  subtitle: string;
  titleDuration: number;
  clips: ClipSpecH[];
};

export const SECTIONS_H: SectionSpecH[] = [
  {
    tag: "MIS GRUPOS",
    title: "Invitaciones a grupos",
    subtitle: "Así llegan, se aceptan y se abandonan tus grupos",
    titleDuration: 3.2,
    clips: [
      {
        type: "video",
        src: "videos/grupos_inicio.mp4",
        duration: 16,
        step: "INICIO",
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
        step: "MIS GRUPOS",
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
        step: "DETALLE",
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
        step: "SALIR",
        captions: [
          {
            text: "Para salir de un grupo, usa el ícono de salida junto al grupo en la lista…",
            from: 0,
            duration: 5,
          },
          {
            text: "…o entra al detalle y toca “Salir del grupo” para confirmar.",
            from: 5,
            duration: 13.5,
          },
        ],
      },
    ],
  },
  {
    tag: "MIS JUEGOS",
    title: "Reservaciones de tus partidas",
    subtitle: "Consulta, acepta y sal de tus partidas",
    titleDuration: 3.2,
    clips: [
      {
        type: "video",
        src: "videos/juegos_lista_aceptar.mp4",
        duration: 18.5,
        step: "RESERVAS",
        captions: [
          {
            text: "En Mis Juegos ves tus reservaciones: las cerradas y las que están por confirmar.",
            from: 0,
            duration: 6,
          },
          {
            text: "Entra al detalle de una reservación por confirmar para ver a los jugadores y Aceptar la invitación.",
            from: 6,
            duration: 5,
          },
          {
            text: "Ese mismo detalle te permite salir de la partida cuando quieras.",
            from: 11,
            duration: 7.5,
          },
        ],
      },
      {
        type: "video",
        src: "videos/juegos_salir_26s.mp4",
        duration: 26.4,
        step: "SALIR",
        captions: [
          {
            text: "Para salir de una partida, entra al detalle y toca “Salir de la partida”.",
            from: 0,
            duration: 15,
          },
          {
            text: "También puedes salir directo desde la lista, sin entrar al detalle, con el ícono junto a cada partida.",
            from: 15,
            duration: 11.4,
          },
        ],
      },
      {
        type: "image",
        src: "videos/juegos_vacio.png",
        duration: 3,
        step: "LISTO",
        captions: [{ text: "Así de simple queda tu lista al salir.", from: 0, duration: 3 }],
      },
    ],
  },
];

export const CLOSING_DURATION_H = 3.5;

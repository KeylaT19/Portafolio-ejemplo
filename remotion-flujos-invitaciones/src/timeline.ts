export const FPS = 30;

export const sec = (s: number) => Math.round(s * FPS);

export type CaptionSpec = {
  text: string;
  from: number; // seconds, relative to clip start
  duration: number; // seconds
};

export type ClipSpec = {
  type: "video" | "image";
  src: string;
  duration: number; // seconds
  captions: CaptionSpec[];
};

export type SectionSpec = {
  tag: string;
  title: string;
  subtitle: string;
  titleDuration: number; // seconds
  clips: ClipSpec[];
};

export const SECTIONS: SectionSpec[] = [
  {
    tag: "Mis Grupos",
    title: "Invitaciones a grupos",
    subtitle: "Así llegan, se aceptan y se abandonan tus grupos",
    titleDuration: 3.2,
    clips: [
      {
        type: "video",
        src: "videos/grupos_inicio.mp4",
        duration: 16,
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
    tag: "Mis Juegos",
    title: "Reservaciones de tus partidas",
    subtitle: "Consulta, acepta y sal de tus partidas",
    titleDuration: 3.2,
    clips: [
      {
        type: "video",
        src: "videos/juegos_lista_aceptar.mp4",
        duration: 18.5,
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
        src: "videos/juegos_salir.mp4",
        duration: 28,
        captions: [
          {
            text: "Para salir de una partida, entra al detalle y toca “Salir de la partida”.",
            from: 0,
            duration: 15,
          },
          {
            text: "También puedes salir directo desde la lista, sin entrar al detalle, con el ícono junto a cada partida.",
            from: 15,
            duration: 13,
          },
        ],
      },
      {
        type: "image",
        src: "videos/juegos_vacio.png",
        duration: 3,
        captions: [{ text: "Así de simple queda tu lista al salir.", from: 0, duration: 3 }],
      },
    ],
  },
];

export const CLOSING_DURATION = 3.5;

export const sectionContentDuration = (section: SectionSpec) =>
  section.clips.reduce((acc, c) => acc + c.duration, 0);

export const totalDurationSeconds =
  SECTIONS.reduce((acc, s) => acc + s.titleDuration + sectionContentDuration(s), 0) +
  CLOSING_DURATION;

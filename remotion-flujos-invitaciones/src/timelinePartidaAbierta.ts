import { ClipSpec } from "./captionTypes";

export const FPS_PA = 30;
export const secPA = (s: number) => Math.round(s * FPS_PA);

export const TRANSITION_FRAMES_PA = 15; // 0.5s crossfade between every scene

export type ClipSpecPA = ClipSpec;

export const MAIN_TITLE_PA = "¿Cómo reservar una partida abierta?";
export const CLOSING_TITLE_PA = "¡Así se arma una partida abierta entre todos!";

export const TITLE_DURATION_PA = 7;
export const CLOSING_DURATION_PA = 2.3;

const ROLE_ORGANIZADOR = "Vista del organizador";
const ROLE_INVITADO = "Vista del invitado";

const WARNING_CAPTION =
  "El horario aún no está confirmado: falta completar 4 jugadores para cerrar la partida.";

export const CLIPS_PA: ClipSpecPA[] = [
  // --- Organizador ---
  {
    type: "video",
    src: "videos/abierta_reservar.mp4",
    duration: 8.0,
    tag: "RESERVAR CANCHA",
    roleTag: ROLE_ORGANIZADOR,
    phoneCropTop: 145,
    highlights: [{ xPct: 50, yPct: 65, from: 3.5, duration: 0.6 }],
    captions: [
      {
        text: "Elige “Partida Abierta” si quieres reservar una partida de manera individual.",
        from: 0,
        duration: 8.0,
      },
    ],
  },
  {
    type: "video",
    src: "videos/abierta_horarios.mp4",
    duration: 10.5,
    tag: "HORARIOS DISPONIBLES",
    roleTag: ROLE_ORGANIZADOR,
    phoneCropTop: 145,
    highlights: [{ xPct: 50, yPct: 79, from: 9.0, duration: 0.6 }],
    captions: [
      {
        text: "Elige la fecha y el horario disponible para tu partida.",
        from: 0,
        duration: 10.5,
      },
    ],
  },
  {
    type: "video",
    src: "videos/abierta_primer_jugador.mp4",
    duration: 14.0,
    tag: "ERES EL PRIMER JUGADOR",
    roleTag: ROLE_ORGANIZADOR,
    highlights: [{ xPct: 50, yPct: 79, from: 7.7, duration: 0.6 }],
    captions: [
      {
        text: "Al ser el primer jugador, el sistema avisa a los demás socios que esta partida abierta ya está disponible para unirse.",
        from: 0,
        duration: 8.0,
      },
      {
        text: WARNING_CAPTION,
        from: 8.0,
        duration: 6.0,
      },
    ],
  },
  {
    // No tag/caption: the "¡Participación confirmada!" screen speaks for itself.
    // Frozen still (not the source video) so the visible content stays fully
    // settled after trimming out an internal segment per user request.
    type: "image",
    src: "videos/abierta_confirmada_org_still.png",
    duration: 2.8,
    tag: "",
    roleTag: ROLE_ORGANIZADOR,
    captions: [],
  },
  {
    type: "video",
    src: "videos/abierta_misjuegos_org.mp4",
    duration: 4.8,
    tag: "MIS JUEGOS · POR CONFIRMAR",
    roleTag: ROLE_ORGANIZADOR,
    highlights: [{ xPct: 58, yPct: 76, from: 2.6, duration: 0.7 }],
    captions: [
      {
        text: "Mientras falten jugadores, la partida abierta aparece “Por confirmar” en Mis juegos.",
        from: 0,
        duration: 4.8,
      },
    ],
  },
  {
    type: "video",
    src: "videos/abierta_detalle_org.mp4",
    duration: 5.5,
    tag: "DETALLE DE LA PARTIDA",
    roleTag: ROLE_ORGANIZADOR,
    captions: [
      {
        text: "Como organizador puedes ver el detalle en cualquier momento.",
        from: 0,
        duration: 5.5,
      },
    ],
  },
  // --- Invitado ---
  {
    type: "video",
    src: "videos/abierta_disponible.mp4",
    duration: 7.0,
    tag: "PARTIDA ABIERTA DISPONIBLE",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    highlights: [{ xPct: 85, yPct: 13, from: 4.9, duration: 0.6 }],
    captions: [
      {
        text: "Los demás socios ven la partida abierta disponible desde la pantalla de inicio, con los lugares que aún faltan por completar.",
        from: 0,
        duration: 7.0,
      },
    ],
  },
  {
    type: "video",
    src: "videos/abierta_unete.mp4",
    duration: 13.4,
    tag: "ÚNETE A LA PARTIDA",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    highlights: [{ xPct: 50, yPct: 79, from: 5.4, duration: 0.6 }],
    captions: [
      {
        text: "Cada jugador puede ver el detalle de la partida antes de unirse.",
        from: 0,
        duration: 5.4,
      },
      {
        text: WARNING_CAPTION,
        from: 5.4,
        duration: 8.0,
      },
    ],
  },
  {
    // No tag/caption: same confirmation screen as the organizer's.
    // Frozen still (not the source video) so the visible content stays fully
    // settled after trimming out an internal segment per user request.
    type: "image",
    src: "videos/abierta_confirmada_inv_still.png",
    duration: 0.7,
    tag: "",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    captions: [],
  },
  {
    type: "video",
    src: "videos/abierta_detalle_inv.mp4",
    duration: 9.0,
    tag: "DETALLE DE LA PARTIDA",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    captions: [
      {
        text: "En el detalle, cada jugador ve quién organiza y quiénes ya confirmaron su lugar.",
        from: 0,
        duration: 9.0,
      },
    ],
  },
];

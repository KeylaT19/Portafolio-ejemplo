import { ClipSpec } from "./captionTypes";

export const FPS_RE = 30;
export const secRE = (s: number) => Math.round(s * FPS_RE);

export const TRANSITION_FRAMES_RE = 15; // 0.5s crossfade between every scene

export type ClipSpecRE = ClipSpec;

export const MAIN_TITLE_RE = "¿Cómo reenviar una invitación?";
export const CLOSING_TITLE_RE =
  "Así de fácil reenvías invitaciones para reservaciones de partidas privadas.";

export const TITLE_DURATION_RE = 7;
export const CLOSING_DURATION_RE = 6.7;

const ROLE_ORGANIZADOR = "Vista del organizador";
const ROLE_INVITADO = "Vista del invitado";

export const CLIPS_RE: ClipSpecRE[] = [
  // --- Organizador ---
  {
    type: "video",
    src: "videos/reenviar_mis_juegos.mp4",
    duration: 9.2,
    tag: "MIS JUEGOS",
    roleTag: ROLE_ORGANIZADOR,
    highlights: [{ xPct: 63, yPct: 78, from: 7.4, duration: 0.6 }],
    captions: [
      {
        text: "Mientras la partida privada siga “Por confirmar”, puedes volver a su detalle para reenviar las invitaciones pendientes.",
        from: 0,
        duration: 9.2,
      },
    ],
  },
  {
    // Fluid: detail screen reveal + scroll down to the button + the tap
    // itself, in one continuous recording. The middle hold (button fully
    // visible, static) was freeze-extended so both captions have room to
    // be read before the tap triggers the loading state.
    type: "video",
    src: "videos/reenviar_detalle.mp4",
    duration: 12.8,
    tag: "DETALLE DE LA PARTIDA",
    roleTag: ROLE_ORGANIZADOR,
    highlights: [{ xPct: 53, yPct: 92, from: 10.9, duration: 0.6 }],
    captions: [
      {
        text: "Las invitaciones ya se enviaron automáticamente al armar la partida, pero puedes reenviarlas a quienes aún no han respondido.",
        from: 0,
        duration: 9.0,
      },
      {
        text: "Desplázate hasta el final y toca “Reenviar invitaciones”.",
        from: 9.0,
        duration: 3.8,
      },
    ],
  },
  {
    // No tag/caption: the "Reenvío exitoso" screen speaks for itself.
    type: "image",
    src: "videos/reenviar_exitoso_still.png",
    duration: 2.0,
    tag: "",
    roleTag: ROLE_ORGANIZADOR,
    captions: [],
  },
  {
    type: "video",
    src: "videos/reenviar_cooldown.mp4",
    duration: 8.1,
    tag: "DETALLE DE LA PARTIDA",
    roleTag: ROLE_ORGANIZADOR,
    highlights: [{ xPct: 50, yPct: 92, from: 0.8, duration: 0.6 }],
    captions: [
      {
        text: "El botón se bloquea unos minutos después de cada reenvío.",
        from: 0,
        duration: 8.1,
      },
    ],
  },
  // --- Invitado ---
  {
    type: "video",
    src: "videos/reenviar_recibe.mp4",
    duration: 10.0,
    tag: "PANTALLA DE INICIO",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    highlights: [{ xPct: 35, yPct: 34, from: 7.0, duration: 0.8 }],
    captions: [
      {
        text: "El jugador ve la invitación en su pantalla de inicio: si se reenvía, no se duplica, solo reemplaza a la anterior.",
        from: 0,
        duration: 10.0,
      },
    ],
  },
  {
    type: "video",
    src: "videos/reenviar_aceptar.mp4",
    duration: 3.8,
    tag: "ACEPTAR INVITACIÓN",
    roleTag: ROLE_INVITADO,
    roleTagVariant: "sky",
    highlights: [{ xPct: 29, yPct: 48, from: 0.5, duration: 0.5 }],
    captions: [
      {
        text: "Al aceptar, confirma su lugar en la partida.",
        from: 0,
        duration: 3.8,
      },
    ],
  },
];

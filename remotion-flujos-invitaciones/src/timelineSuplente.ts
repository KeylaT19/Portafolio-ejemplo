import { ClipSpec } from "./captionTypes";

export const FPS_S = 30;
export const secS = (s: number) => Math.round(s * FPS_S);

export const TRANSITION_FRAMES_S = 15; // 0.5s crossfade between every scene

export type ClipSpecS = ClipSpec;

export const MAIN_TITLE_S = "Qué hacer si falta un jugador en tu partida";
export const CLOSING_TITLE_S = "¡Así de fácil mantienes tu equipo completo!";

export const CONTEXT_TITLE_S = "¿No llegaron todos a la cancha?";
export const CONTEXT_BOX_TEXT_S =
  "Quien no pueda asistir puede abandonar la partida para que el espacio quede libre y otro socio lo ocupe como suplente.";

export const TITLE_DURATION_S = 7;
export const CONTEXT_DURATION_S = 12;
export const CLOSING_DURATION_S = 213 / 30;

const ROLE_SALIENTE = "Vista del jugador saliente";
const ROLE_SUPLENTE = "Vista del jugador suplente";

const SUPLENTE_UNIRSE_CAPTION =
  "Si le falta un jugador, puede tocarla y confirmar “Sí, unirme” para sumarse como suplente.";
const SALIR_LISTA_RESULT_CAPTION =
  "Listo: saliste de la partida, y el lugar queda disponible para un suplente.";

export const CLIPS_S: ClipSpecS[] = [
  {
    type: "video",
    src: "videos/salir_detalle.mp4",
    duration: 8.9,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_SALIENTE,
    captions: [
      {
        text: "¿No podrás asistir?, entra al detalle de tu partida y toca “Salir de la partida” para dejar el lugar disponible.",
        from: 0,
        duration: 8.9,
      },
    ],
  },
  {
    type: "video",
    src: "videos/salir_lista.mp4",
    duration: 4.9,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_SALIENTE,
    captions: [
      {
        text: "También puedes salir directo desde la lista, sin entrar al detalle. Solo dale clic al botón de “Salir de la partida”.",
        from: 0,
        duration: 4.6,
      },
      {
        text: SALIR_LISTA_RESULT_CAPTION,
        from: 4.6,
        duration: 0.3,
      },
    ],
  },
  {
    // Held frame of "No tienes partidas" so the result has time to read
    // instead of rushing past it at the tail of the real recording.
    type: "image",
    src: "videos/salir_vacio.png",
    duration: 5,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_SALIENTE,
    captions: [
      {
        text: SALIR_LISTA_RESULT_CAPTION,
        from: 0,
        duration: 5,
      },
    ],
  },
  {
    type: "video",
    src: "videos/suplente_inicio.mp4",
    duration: 6.8,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SUPLENTE,
    roleTagVariant: "sky",
    captions: [
      {
        text: "Cualquier socio puede ver esa partida abierta en Inicio, dentro de Reservas del día.",
        from: 0,
        duration: 6.8,
      },
    ],
  },
  {
    type: "image",
    src: "videos/suplente_enjuego.png",
    duration: 9,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SUPLENTE,
    roleTagVariant: "sky",
    captions: [
      {
        text: "Solo puedes unirte como suplente cuando la partida ya está marcada como “En juego”, dentro de su horario reservado.",
        from: 0,
        duration: 9,
      },
    ],
  },
  {
    // Held frame of the "Unirse a la partida" confirmation, giving readers
    // time on the dialog before the real recording continues into the tap.
    // Matches the exact source frame suplente_unirse.mp4 now starts from,
    // so the crossfade between the two doesn't visibly jump.
    type: "image",
    src: "videos/suplente_modal.png",
    duration: 5,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SUPLENTE,
    roleTagVariant: "sky",
    captions: [
      {
        text: SUPLENTE_UNIRSE_CAPTION,
        from: 0,
        duration: 5,
      },
    ],
  },
  {
    type: "video",
    src: "videos/suplente_unirse.mp4",
    duration: 2,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SUPLENTE,
    roleTagVariant: "sky",
    captions: [
      {
        text: SUPLENTE_UNIRSE_CAPTION,
        from: 0,
        duration: 2,
      },
    ],
  },
  {
    type: "image",
    src: "videos/suplente_exito.png",
    duration: 7.3,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SUPLENTE,
    roleTagVariant: "sky",
    captions: [
      {
        text: "Listo: ya quedó registrado como suplente de esa partida.",
        from: 0,
        duration: 7.3,
      },
    ],
  },
];

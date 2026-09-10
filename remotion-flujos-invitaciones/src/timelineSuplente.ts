import { ClipSpec } from "./captionTypes";

export const FPS_S = 30;
export const secS = (s: number) => Math.round(s * FPS_S);

export const TRANSITION_FRAMES_S = 15; // 0.5s crossfade between every scene

export type ClipSpecS = ClipSpec;

export const MAIN_TITLE_S = "Qué hacer si falta un jugador en tu partida";
export const CLOSING_TITLE_S = "Así de fácil se resuelve la falta de un jugador";

// De-emphasized lead-in line (smaller, lighter weight, but still legible).
export const CONTEXT_LEAD_S =
  "A veces, al llegar a la cancha para tu reservación, no han llegado todos los jugadores registrados en la partida.";
// The point to emphasize (bigger, bold).
export const CONTEXT_EMPHASIS_S =
  "La persona que no podrá asistir puede salir de la partida, dejándola abierta para que cualquier socio se una como suplente.";

export const TITLE_DURATION_S = 7;
export const CONTEXT_DURATION_S = 12;
export const CLOSING_DURATION_S = 201 / 30;

export const CLIPS_S: ClipSpecS[] = [
  {
    type: "video",
    src: "videos/salir_detalle.mp4",
    duration: 8.9,
    tag: "Pantalla de Mis Juegos",
    captions: [
      {
        text: "Si no podrás asistir, entra al detalle de tu partida y toca “Salir de la partida” para dejar el lugar disponible.",
        from: 0,
        duration: 8.9,
      },
    ],
  },
  {
    type: "video",
    src: "videos/salir_lista.mp4",
    duration: 6.6,
    tag: "Pantalla de Mis Juegos",
    captions: [
      {
        text: "También puedes salir directo desde la lista, sin entrar al detalle. Solo dale clic al botón de “Salir de la partida”.",
        from: 0,
        duration: 2.9,
      },
      {
        text: "Listo: saliste de la partida, y el lugar queda disponible para un suplente.",
        from: 2.9,
        duration: 3.7,
      },
    ],
  },
  {
    type: "video",
    src: "videos/suplente_inicio.mp4",
    duration: 6.8,
    tag: "Pantalla de Inicio",
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
    duration: 5,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Solo puedes unirte como suplente cuando la partida ya está marcada como “En juego”, dentro de su horario reservado.",
        from: 0,
        duration: 5,
      },
    ],
  },
  {
    type: "video",
    src: "videos/suplente_unirse.mp4",
    duration: 5.2,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Si le falta un jugador, puede tocarla y confirmar “Sí, unirme” para sumarse como suplente.",
        from: 0,
        duration: 5.2,
      },
    ],
  },
  {
    type: "image",
    src: "videos/suplente_exito.png",
    duration: 7.3,
    tag: "Pantalla de Inicio",
    captions: [
      {
        text: "Listo: ya quedó registrado como suplente de esa partida.",
        from: 0,
        duration: 7.3,
      },
    ],
  },
];

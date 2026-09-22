import { ClipSpec } from "./captionTypes";

export const FPS_SR = 30;
export const secSR = (s: number) => Math.round(s * FPS_SR);

export const TRANSITION_FRAMES_SR = 15; // 0.5s crossfade between every scene

export type ClipSpecSR = ClipSpec;

export const MAIN_TITLE_SR = "¿Cómo jugar en una cancha sin reservas?";
export const CLOSING_TITLE_SR = "¡Así de fácil aprovechas una cancha libre!";

export const CONTEXT_TITLE_SR = "¿Hay una cancha disponible en tu horario actual?";
export const CONTEXT_BOX_TEXT_SR =
  "Puedes unirte a jugar sin reservar y sin gastar ninguna de tus reservaciones. Cada socio solo puede tomar una cancha libre por horario.";

export const TITLE_DURATION_SR = 7;
export const CONTEXT_DURATION_SR = 11;
export const CLOSING_DURATION_SR = 9.8;

const ROLE_PRIMERO = "Vista del primer jugador";
const ROLE_SEGUNDO = "Vista del segundo jugador";

export const CLIPS_SR: ClipSpecSR[] = [
  {
    // Held still frame so the screen stays completely fixed for the whole
    // time this caption is on screen, instead of the source recording's
    // own motion during that window.
    type: "image",
    src: "videos/sinreserva_lista1_still.png",
    duration: 7.0,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_PRIMERO,
    captions: [
      {
        text: "Cuando una cancha está libre dentro de su horario, verás la etiqueta “Juega sin Reservación”.",
        from: 0,
        duration: 7.0,
      },
    ],
  },
  {
    // Covers the whole confirm-and-take flow in one continuous recording:
    // the modal, the tap, the success screen, and the list settling back
    // with the court already marked "En juego".
    type: "video",
    src: "videos/sinreserva_tomar.mp4",
    duration: 15.0,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_PRIMERO,
    highlights: [
      { xPct: 27, yPct: 58, from: 0, duration: 1.0 },
      { xPct: 50, yPct: 55, from: 4.2, duration: 1.0 },
    ],
    captions: [
      {
        text: "Dale clic en “Puesto libre” y, en el modal, confirma “Sí, tomar la cancha”. No se gasta ninguna de tus reservaciones.",
        from: 0,
        duration: 8.6,
      },
      {
        text: "Listo: la cancha queda “En juego”, y otros socios todavía pueden sumarse.",
        from: 8.6,
        duration: 6.4,
      },
    ],
  },
  {
    // Held still frame so this screen stays paused for the whole caption
    // instead of drifting with the source recording.
    type: "image",
    src: "videos/sinreserva_misjuegos1_still.png",
    duration: 6.0,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_PRIMERO,
    highlights: [{ xPct: 58, yPct: 73, from: 2.5, duration: 1.2 }],
    captions: [
      {
        text: "También puedes verla en Mis Juegos, con el número de jugadores confirmados.",
        from: 0,
        duration: 6.0,
      },
    ],
  },
  {
    type: "video",
    src: "videos/sinreserva_detalle1.mp4",
    duration: 6.5,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_PRIMERO,
    captions: [
      {
        text: "Desde el detalle puedes ver a los jugadores agregados o salir de la partida.",
        from: 0,
        duration: 6.5,
      },
    ],
  },
  {
    // One fluid recording: the list showing the court already active,
    // straight through the "Unirme a la partida" modal, the tap, and the
    // success screen settling on the list with both players. No cut
    // between "sees the active court" and the join itself.
    type: "video",
    src: "videos/sinreserva_unirse.mp4",
    duration: 11.7,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SEGUNDO,
    roleTagVariant: "sky",
    highlights: [
      { xPct: 50, yPct: 53, from: 0.7, duration: 1.0 },
      { xPct: 50, yPct: 53, from: 3.5, duration: 1.0 },
    ],
    captions: [
      {
        text: "Cualquier otro socio puede ver esa misma cancha activa y sumarse.",
        from: 0,
        duration: 5.5,
      },
      {
        text: "Para estas ocasiones se necesitan mínimo 2 jugadores para poder utilizar la cancha, y se puede llegar hasta 6.",
        from: 5.5,
        duration: 6.2,
      },
    ],
  },
  {
    // This player's own "Mis Juegos" screen, scrolling into "Detalle de la
    // partida". The source clip briefly shows the browser's address bar,
    // which sits lower than the usual status bar, so this one clip needs a
    // taller top crop than the rest.
    type: "video",
    src: "videos/sinreserva_detalle2.mp4",
    duration: 6.0,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_SEGUNDO,
    roleTagVariant: "sky",
    phoneCropTop: 150,
    highlights: [{ xPct: 58, yPct: 77, from: 0.4, duration: 1.0 }],
    captions: [
      {
        text: "En Mis Juegos puedes ver cuántos jugadores ya se han sumado.",
        from: 0,
        duration: 6.0,
      },
    ],
  },
];

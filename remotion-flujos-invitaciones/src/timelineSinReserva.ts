import { ClipSpec } from "./captionTypes";

export const FPS_SR = 30;
export const secSR = (s: number) => Math.round(s * FPS_SR);

export const TRANSITION_FRAMES_SR = 15; // 0.5s crossfade between every scene

export type ClipSpecSR = ClipSpec;

export const MAIN_TITLE_SR = "¿Cómo jugar en una cancha libre sin reservar?";
export const CLOSING_TITLE_SR = "¡Así de fácil aprovechas una cancha libre!";

export const CONTEXT_TITLE_SR = "¿Hay una cancha disponible en tu horario?";
export const CONTEXT_BOX_TEXT_SR =
  "Puedes unirte a jugar sin reservar y sin gastar ninguna de tus reservaciones. Cada socio solo puede tomar una cancha libre por horario.";

export const TITLE_DURATION_SR = 9;
export const CONTEXT_DURATION_SR = 13;
export const CLOSING_DURATION_SR = 9;

const ROLE_PRIMERO = "Vista del primer jugador";
const ROLE_SEGUNDO = "Vista del segundo jugador";

export const CLIPS_SR: ClipSpecSR[] = [
  {
    // Held still frame so the screen stays completely fixed for the whole
    // time this caption is on screen, instead of the source recording's
    // own motion during that window.
    type: "image",
    src: "videos/sinreserva_lista1_still.png",
    duration: 5.0,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_PRIMERO,
    captions: [
      {
        text: "Cuando una cancha está libre dentro de su horario, verás la etiqueta “Juega sin Reserva”.",
        from: 0,
        duration: 5.0,
      },
    ],
  },
  {
    // Covers the whole confirm-and-take flow in one continuous recording:
    // the modal, the tap, the success screen, and the list settling back
    // with the court already marked "En juego".
    type: "video",
    src: "videos/sinreserva_tomar.mp4",
    duration: 13.0,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_PRIMERO,
    captions: [
      {
        text: "Tócala y confirma “Sí, tomar la cancha”. No se gasta ninguna de tus reservaciones.",
        from: 0,
        duration: 6.6,
      },
      {
        text: "Listo: la cancha queda “En juego”, y otros socios todavía pueden sumarse.",
        from: 6.6,
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
    type: "video",
    src: "videos/sinreserva_lista2.mp4",
    duration: 3.0,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SEGUNDO,
    roleTagVariant: "sky",
    captions: [
      {
        text: "Cualquier otro socio puede ver esa misma cancha activa y sumarse.",
        from: 0,
        duration: 3.0,
      },
    ],
  },
  {
    // Same continuous-recording approach as sinreserva_tomar, but from the
    // second player's device: modal, tap, success, and the list settling
    // back with both players now shown.
    type: "video",
    src: "videos/sinreserva_unirse.mp4",
    duration: 11.5,
    tag: "Pantalla de Inicio",
    roleTag: ROLE_SEGUNDO,
    roleTagVariant: "sky",
    captions: [
      {
        // Continues the previous screen's caption instead of introducing
        // the tap instruction, so the same message reads through the
        // whole modal-to-tap sequence.
        text: "Cualquier otro socio puede ver esa misma cancha activa y sumarse.",
        from: 0,
        duration: 3.5,
      },
      {
        text: "Se necesitan mínimo 2 jugadores para activarla, y puede llegar hasta 6.",
        from: 3.5,
        duration: 8.0,
      },
    ],
  },
  {
    // No clean recording of this player's own "Detalle de la partida" is
    // available (the source footage has an onscreen browser toolbar that
    // can't be cropped out), so this closing screen is held paused instead,
    // with extra time on its caption.
    type: "image",
    src: "videos/sinreserva_misjuegos2_still.png",
    duration: 6.5,
    tag: "Pantalla de Mis Juegos",
    roleTag: ROLE_SEGUNDO,
    roleTagVariant: "sky",
    captions: [
      {
        text: "En Mis Juegos puedes ver cuántos jugadores faltan o ya se han sumado.",
        from: 0,
        duration: 6.5,
      },
    ],
  },
];

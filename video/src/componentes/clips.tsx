import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import esquinasMonitor from '../ui/esquinas-monitor.json';

type P = [number, number];

/** matrix3d que lleva el rectángulo (0,0)-(w,h) al cuadrilátero q (tl, tr, br, bl). */
export const matrizPerspectiva = (w: number, h: number, q: P[]) => {
	const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
	// Homografía del cuadrado unitario al cuadrilátero (Heckbert).
	const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
	const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
	const den = dx1 * dy2 - dx2 * dy1;
	const g = (sx * dy2 - dx2 * sy) / den;
	const hh = (dx1 * sy - sx * dy1) / den;
	const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
	const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
	// Se compone con el escalado del rectángulo w×h al cuadrado unitario.
	const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
	return `matrix3d(${m.join(',')})`;
};

/** Clip de Envato a pantalla completa con un empuje lento de cámara. */
export const ClipFondo: React.FC<{
	archivo: string;
	desde?: number; // segundos dentro del clip
	empuje?: number;
	oscurecer?: number;
	children?: React.ReactNode;
}> = ({archivo, desde = 0, empuje = 0.08, oscurecer = 0, children}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const esc = interpolate(frame, [0, durationInFrames], [1, 1 + empuje]);
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
			<AbsoluteFill style={{transform: `scale(${esc})`}}>
				<OffthreadVideo src={staticFile(`clips/${archivo}`)} startFrom={Math.round(desde * fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
				{children}
			</AbsoluteFill>
			{oscurecer > 0 && <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(0,27,68,${oscurecer}) 0%, rgba(0,27,68,${oscurecer * 0.55}) 55%, rgba(0,27,68,${oscurecer * 0.2}) 100%)`}} />}
		</AbsoluteFill>
	);
};

/**
 * Clip del monitor con pantalla verde: el contenido (1440×900) se coloca sobre el verde
 * con la perspectiva medida cuadro por cuadro (src/ui/esquinas-monitor.json, a 25 fps).
 * Cuando llegue la grabación real del sistema, `children` pasa a ser un <OffthreadVideo>.
 */
export const MonitorVerde: React.FC<{desde?: number; empuje?: number; children: React.ReactNode}> = ({desde = 0, empuje = 0, children}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const lista = esquinasMonitor as (P[] | null)[];
	const i = Math.min(lista.length - 1, Math.round((desde + frame / fps) * 25));
	const q = (lista[i] ?? lista.find(Boolean)!) as P[];
	// Se agranda 3 px hacia afuera para tapar el borde verde.
	const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4;
	const cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
	const qq = q.map(([x, y]) => {
		const l = Math.hypot(x - cx, y - cy);
		return [x + ((x - cx) / l) * 3, y + ((y - cy) / l) * 3] as P;
	});
	const esc = interpolate(frame, [0, durationInFrames], [1, 1 + empuje]);
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
			<AbsoluteFill style={{transform: `scale(${esc})`, transformOrigin: '45% 45%'}}>
				<OffthreadVideo src={staticFile('clips/monitor-verde.mp4')} startFrom={Math.round(desde * fps)} muted style={{width: 1920, height: 1080}} />
				<div style={{position: 'absolute', left: 0, top: 0, width: 1440, height: 900, transformOrigin: '0 0', transform: matrizPerspectiva(1440, 900, qq), overflow: 'hidden'}}>
					{children}
					{/* Reflejo sutil de pantalla */}
					<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,.10) 0%, transparent 35%, transparent 70%, rgba(0,0,0,.06) 100%)'}} />
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

/** Grabación o captura real completa (sin zoom), centrada en el lienzo de 1440×900 del monitor. */
export const PantallaCompleta: React.FC<{src: string; ancho: number; alto: number; video?: boolean; desde?: number; velocidad?: number; fondo?: string}> = ({
	src,
	ancho,
	alto,
	video,
	desde = 0,
	velocidad = 1,
	fondo = '#f3f3f3',
}) => {
	const {fps} = useVideoConfig();
	const esc = 1440 / ancho;
	const estilo: React.CSSProperties = {position: 'absolute', left: 0, top: (900 - alto * esc) / 2, width: 1440, height: alto * esc};
	return (
		<AbsoluteFill style={{width: 1440, height: 900, background: fondo}}>
			{video ? (
				<OffthreadVideo src={staticFile(src)} startFrom={Math.round(desde * fps)} playbackRate={velocidad} muted style={estilo} />
			) : (
				<Img src={staticFile(src)} style={estilo} />
			)}
		</AbsoluteFill>
	);
};

// ───────────── Marcos de dispositivo (PNG con la pantalla transparente) ─────────────

const MONITOR = {src: 'marcos/monitor.png', ancho: 2000, alto: 1770, pantalla: {x: 92, y: 93, w: 1815, h: 956}};
const CELULAR = {src: 'marcos/celular.png', ancho: 1108, alto: 2000, pantalla: {x: 174, y: 110, w: 809, h: 1752}};

/** Si llenar el alto recorta menos del 6 % del ancho, se llena; si no, se ajusta al ancho (arriba). */
const escalaAjuste = (ancho: number, alto: number, w: number, h: number) => {
	const porAncho = w / ancho;
	const porAlto = h / alto;
	return porAlto > porAncho && porAncho / porAlto > 0.94 ? porAlto : porAncho;
};

/** Fuente real (grabación o captura) colocada en un área: ajusta al ancho y, si casi coincide la proporción, llena el área. */
const Contenido: React.FC<{src: string; ancho: number; alto: number; video?: boolean; desde?: number; velocidad?: number; w: number; h: number; fondo: string}> = ({
	src,
	ancho,
	alto,
	video,
	desde = 0,
	velocidad = 1,
	w,
	h,
	fondo,
}) => {
	const {fps} = useVideoConfig();
	const esc = escalaAjuste(ancho, alto, w, h);
	const estilo: React.CSSProperties = {position: 'absolute', left: (w - ancho * esc) / 2, top: 0, width: ancho * esc, height: alto * esc};
	return (
		<div style={{position: 'absolute', inset: 0, background: fondo, overflow: 'hidden'}}>
			{video ? (
				<OffthreadVideo src={staticFile(src)} startFrom={Math.round(desde * fps)} playbackRate={velocidad} muted style={estilo} />
			) : (
				<Img src={staticFile(src)} style={estilo} />
			)}
		</div>
	);
};

/** Monitor de escritorio con la pantalla real del sistema detrás del marco. `children` va en coordenadas de la fuente. */
export const MonitorReal: React.FC<{
	src: string;
	ancho: number;
	alto: number;
	video?: boolean;
	desde?: number;
	velocidad?: number;
	anchoVista?: number;
	fondo?: string;
	children?: React.ReactNode;
}> = ({anchoVista = 1100, fondo = '#f3f3f3', children, ...f}) => {
	const k = anchoVista / MONITOR.ancho;
	const p = MONITOR.pantalla;
	const escFuente = escalaAjuste(f.ancho, f.alto, p.w * k, p.h * k);
	const izq = (p.w * k - f.ancho * escFuente) / 2;
	return (
		<div style={{position: 'relative', width: anchoVista, height: MONITOR.alto * k, filter: 'drop-shadow(0 40px 60px rgba(0,10,30,.5))'}}>
			<div style={{position: 'absolute', left: p.x * k, top: p.y * k, width: p.w * k, height: p.h * k, overflow: 'hidden'}}>
				<Contenido {...f} w={p.w * k} h={p.h * k} fondo={fondo} />
				{children && (
					<div style={{position: 'absolute', left: izq, top: 0, width: f.ancho, height: f.alto, transformOrigin: '0 0', transform: `scale(${escFuente})`}}>{children}</div>
				)}
			</div>
			<Img src={staticFile(MONITOR.src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
		</div>
	);
};

/** Celular con contenido detrás del marco. El contenido se dibuja a 390 px de ancho (proporción de la pantalla). */
export const CelularMarco: React.FC<{altoVista?: number; rot?: number; children: React.ReactNode}> = ({altoVista = 900, rot = 0, children}) => {
	const k = altoVista / CELULAR.alto;
	const p = CELULAR.pantalla;
	const escContenido = (p.w * k) / 390;
	return (
		<div style={{position: 'relative', width: CELULAR.ancho * k, height: altoVista, transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 40px 60px rgba(0,10,30,.55))'}}>
			<div style={{position: 'absolute', left: p.x * k, top: p.y * k, width: p.w * k, height: p.h * k, overflow: 'hidden', borderRadius: 100 * k, background: '#fff'}}>
				<div style={{width: 390, height: (p.h * k) / escContenido, transformOrigin: '0 0', transform: `scale(${escContenido})`, position: 'relative'}}>{children}</div>
			</div>
			<Img src={staticFile(CELULAR.src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
		</div>
	);
};

/** Captura móvil real: la parte superior arriba y la barra inferior abajo, como en el celular. */
export const CapturaMovil: React.FC<{src: string; ancho: number; alto: number; corteBarra: number; fondo?: string}> = ({src, ancho, alto, corteBarra, fondo = '#f9fafb'}) => {
	const esc = 390 / ancho;
	const altoPantalla = (CELULAR.pantalla.h / CELULAR.pantalla.w) * 390;
	return (
		<div style={{position: 'absolute', inset: 0, background: fondo}}>
			<div style={{position: 'absolute', top: 44, left: 0, width: 390, height: corteBarra * esc, overflow: 'hidden'}}>
				<Img src={staticFile(src)} style={{width: 390, height: alto * esc}} />
			</div>
			<div style={{position: 'absolute', top: altoPantalla - (alto - corteBarra) * esc - 22, left: 0, width: 390, height: (alto - corteBarra) * esc, overflow: 'hidden'}}>
				<Img src={staticFile(src)} style={{width: 390, height: alto * esc, marginTop: -corteBarra * esc}} />
			</div>
		</div>
	);
};

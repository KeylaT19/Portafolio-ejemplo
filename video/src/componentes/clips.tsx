import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
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
export const MonitorVerde: React.FC<{desde?: number; empuje?: number; children: React.ReactNode}> = ({desde = 0, empuje = 0.06, children}) => {
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

import React from 'react';
import {c, fuente, mono} from '../tema';

/** Iconos de trazo simples (estilo lineal, 24×24). */
const RUTAS: Record<string, string> = {
	tablero: 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z',
	ubicacion: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
	activo: 'M4 7h16v12H4zM8 7V4h8v3M4 12h16',
	incidencia: 'M12 3 2 20h20L12 3zM12 10v4M12 17h.01',
	orden: 'M6 3h12v18H6zM9 7h6M9 11h6M9 15h4',
	calendario: 'M4 5h16v16H4zM4 9h16M8 3v4M16 3v4',
	registro: 'M4 19V5M4 19h16M8 15l3-4 3 2 4-6',
	equipos: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M21 20c0-2.6-1.6-4.8-4-5.6',
	buscar: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
	camara: 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
	check: 'M5 12.5 10 17 19 7',
	qr: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1',
	mapa: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
	campana: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
	firma: 'M3 17c3-6 5-9 6-8s-2 7 0 7 3-5 5-5 1 4 3 4 2-2 4-2M3 21h18',
	flecha: 'M5 12h14M13 6l6 6-6 6',
	reloj: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
	escudo: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3zM8.5 12l2.5 2.5 4.5-5',
	repetir: 'M4 12a8 8 0 0 1 14-5.3M20 4v5h-5M20 12a8 8 0 0 1-14 5.3M4 20v-5h5',
};

export const Icono: React.FC<{n: keyof typeof RUTAS | string; tam?: number; color?: string; grosor?: number}> = ({
	n,
	tam = 22,
	color = 'currentColor',
	grosor = 2,
}) => (
	<svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round">
		<path d={RUTAS[n] ?? ''} />
	</svg>
);

export const Avatar: React.FC<{ini: string; color: string; tam?: number}> = ({ini, color, tam = 36}) => (
	<div
		style={{
			width: tam,
			height: tam,
			borderRadius: '50%',
			background: color,
			color: '#fff',
			display: 'grid',
			placeItems: 'center',
			fontFamily: fuente,
			fontWeight: 600,
			fontSize: tam * 0.38,
			flexShrink: 0,
		}}
	>
		{ini}
	</div>
);

const ESTADOS: Record<string, {fondo: string; tinta: string}> = {
	Abierta: {fondo: '#eaf1fc', tinta: c.abierta},
	'En proceso': {fondo: '#fdf3e3', tinta: c.proceso},
	Finalizada: {fondo: '#e3f5f8', tinta: c.finalizada},
	Cerrada: {fondo: '#e6f6ec', tinta: c.cerrada},
	Vencida: {fondo: '#fbeaea', tinta: c.vencida},
	Alta: {fondo: '#fdf3e3', tinta: c.alerta},
	Urgente: {fondo: '#fbeaea', tinta: c.critico},
	Media: {fondo: '#eaf1fc', tinta: c.marca},
};

export const Insignia: React.FC<{t: string; tam?: number}> = ({t, tam = 14}) => {
	const e = ESTADOS[t] ?? ESTADOS.Abierta;
	return (
		<span
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 6,
				padding: `${tam * 0.3}px ${tam * 0.8}px`,
				borderRadius: 999,
				background: e.fondo,
				color: e.tinta,
				fontFamily: fuente,
				fontWeight: 600,
				fontSize: tam,
				whiteSpace: 'nowrap',
			}}
		>
			<span style={{width: tam * 0.5, height: tam * 0.5, borderRadius: '50%', background: e.tinta}} />
			{t}
		</span>
	);
};

export const FolioMini: React.FC<{t: string; tam?: number}> = ({t, tam = 14}) => (
	<span
		style={{
			fontFamily: mono,
			fontSize: tam,
			color: c.marca,
			background: c.marcaTenue,
			padding: `${tam * 0.15}px ${tam * 0.5}px`,
			borderRadius: 6,
			fontWeight: 500,
		}}
	>
		{t}
	</span>
);

/**
 * Ilustración que sustituye a una foto real del equipo.
 * Cuando lleguen las fotos reales, se cambian por <Img src={staticFile('fotos/...')} />.
 */
export const FotoEquipo: React.FC<{tipo: 'bomba' | 'fuga' | 'reparado' | 'caldera' | 'caminadora' | 'clima'; ancho: number; alto: number; radio?: number}> = ({
	tipo,
	ancho,
	alto,
	radio = 12,
}) => {
	const fondos: Record<string, string> = {
		bomba: 'linear-gradient(160deg,#cfe7f5,#7fb4d6)',
		fuga: 'linear-gradient(160deg,#c9d3dd,#7d8b99)',
		reparado: 'linear-gradient(160deg,#d6efe0,#8cc4a3)',
		caldera: 'linear-gradient(160deg,#e6dcd0,#a8927a)',
		caminadora: 'linear-gradient(160deg,#dde3ea,#93a1b1)',
		clima: 'linear-gradient(160deg,#e1ecf7,#9bb6d3)',
	};
	return (
		<div style={{width: ancho, height: alto, borderRadius: radio, background: fondos[tipo], overflow: 'hidden', position: 'relative', flexShrink: 0}}>
			<svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
				<rect x="0" y="105" width="200" height="35" fill="rgba(0,0,0,.12)" />
				{(tipo === 'bomba' || tipo === 'fuga' || tipo === 'reparado') && (
					<g>
						<rect x="20" y="60" width="160" height="10" rx="5" fill="#5b6b7c" />
						<circle cx="85" cy="78" r="28" fill="#2f6fa8" />
						<circle cx="85" cy="78" r="12" fill="#9cc7ea" />
						<rect x="110" y="62" width="50" height="34" rx="6" fill="#3b4b5c" />
						<rect x="70" y="104" width="100" height="8" rx="3" fill="#4a5866" />
						{tipo === 'fuga' && (
							<g fill="#4aa3df">
								<path d="M62 92 q4 8 0 12 q-4-4 0-12z" />
								<path d="M54 100 q3 6 0 9 q-3-3 0-9z" />
								<ellipse cx="70" cy="122" rx="40" ry="6" fill="rgba(74,163,223,.6)" />
							</g>
						)}
						{tipo === 'reparado' && (
							<g>
								<circle cx="165" cy="30" r="18" fill="#15803d" />
								<path d="M156 30 l6 6 l11-12" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
							</g>
						)}
					</g>
				)}
				{tipo === 'caldera' && (
					<g>
						<rect x="65" y="20" width="70" height="88" rx="10" fill="#8a3b2a" />
						<rect x="78" y="40" width="44" height="20" rx="4" fill="#2b2b2b" />
						<circle cx="100" cy="80" r="10" fill="#e8b04b" />
						<rect x="135" y="30" width="30" height="8" fill="#6b7280" />
					</g>
				)}
				{tipo === 'caminadora' && (
					<g>
						<rect x="40" y="88" width="130" height="16" rx="8" fill="#1f2937" />
						<rect x="140" y="30" width="8" height="62" fill="#374151" />
						<rect x="120" y="24" width="50" height="14" rx="4" fill="#111827" />
					</g>
				)}
				{tipo === 'clima' && (
					<g>
						<rect x="30" y="40" width="140" height="44" rx="10" fill="#f8fafc" />
						<rect x="40" y="70" width="120" height="6" rx="3" fill="#cbd5e1" />
					</g>
				)}
			</svg>
			<div
				style={{
					position: 'absolute',
					right: 8,
					bottom: 6,
					fontFamily: mono,
					fontSize: 10,
					color: 'rgba(255,255,255,.85)',
				}}
			>
				.JPG
			</div>
		</div>
	);
};

/** Código QR decorativo (patrón determinista, no codifica nada). */
export const QR: React.FC<{tam?: number; color?: string}> = ({tam = 120, color = c.tinta}) => {
	const n = 21;
	const celdas: React.ReactNode[] = [];
	const ojo = (x: number, y: number) =>
		(x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
	for (let y = 0; y < n; y++) {
		for (let x = 0; x < n; x++) {
			if (ojo(x, y)) continue;
			const v = (x * 7 + y * 13 + x * y * 3) % 5;
			if (v < 2) celdas.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />);
		}
	}
	const Ojo = ({x, y}: {x: number; y: number}) => (
		<g>
			<rect x={x} y={y} width="7" height="7" fill={color} />
			<rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
			<rect x={x + 2} y={y + 2} width="3" height="3" fill={color} />
		</g>
	);
	return (
		<svg width={tam} height={tam} viewBox={`-1 -1 ${n + 2} ${n + 2}`} style={{background: '#fff', borderRadius: 6}} shapeRendering="crispEdges">
			{celdas}
			<Ojo x={0} y={0} />
			<Ojo x={n - 7} y={0} />
			<Ojo x={0} y={n - 7} />
		</svg>
	);
};
